import axios from "axios";
import { generateExpenseHash } from "./utils/hashGenerator.js";

const API = "http://localhost:4001/blockchain";

async function testBlockchainFlow() {

  console.log("\n=========== BLOCKCHAIN TEST START ===========\n");

  const expense = {
    id: "exp033145",
    groupId: "grp3115",
    paidByUserId: "user015",
    amount: 200,
    currency: "INR",
    category: "Food",
    description: "Dinner1",
    expenseDate: "2026-03-13"
  };

  console.log("Expense Object:");
  console.log(expense);

  /*
  STEP 1 — Generate Hash
  */

  const hash = generateExpenseHash(expense);

  console.log("\nGenerated Hash:");
  console.log(hash);

  /*
  STEP 2 — Store on Blockchain
  */

  console.log("\nStoring expense hash on blockchain...");

  const storeResponse = await axios.post(
    `${API}/expense`,
    {
      expenseId: expense.id,
      groupId: expense.groupId,
      hash
    }
  );

  console.log("Transaction Hash:", storeResponse.data.txHash);

  /*
  STEP 3 — Verify Hash
  */

  console.log("\nVerifying stored hash...");

  const verifyResponse = await axios.get(
    `${API}/verify`,
    {
      params: {
        referenceId: expense.id,
        hash
      }
    }
  );

  if (verifyResponse.data.valid) {
    console.log("Verification SUCCESS — hash matches blockchain record");
  } else {
    console.log("Verification FAILED — hash mismatch");
  }

  console.log("\n=========== TEST COMPLETED ===========\n");
}

testBlockchainFlow();