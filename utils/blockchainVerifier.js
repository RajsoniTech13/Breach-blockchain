import axios from "axios";
import { generateSettlementHash } from "./hashGenerator.js";

const BLOCKCHAIN_API = "http://localhost:4001/blockchain";

/*
Verify settlement integrity
*/

export async function verifySettlementIntegrity(settlementRecord) {

  try {

    /*
    STEP 1 — Recalculate hash from DB settlement record
    */

    const recalculatedHash = generateSettlementHash(settlementRecord);

    /*
    STEP 2 — Ask blockchain if stored hash matches
    */

    const response = await axios.get(
      `${BLOCKCHAIN_API}/verify`,
      {
        params: {
          referenceId: settlementRecord.id,
          hash: recalculatedHash
        }
      }
    );

    const blockchainResult = response.data.valid;

    /*
    STEP 3 — Return verification result
    */

    return {
      referenceId: settlementRecord.id,
      recalculatedHash,
      blockchainValid: blockchainResult,
      integrity: blockchainResult === true
    };

  } catch (error) {

    return {
      referenceId: settlementRecord.id,
      integrity: false,
      error: error.message
    };

  }

}