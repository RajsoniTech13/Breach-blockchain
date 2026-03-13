import { ethers } from "ethers";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const abiPath = path.join(__dirname, "../contracts/abi.json");

const abi = JSON.parse(
  fs.readFileSync(abiPath, "utf8")
);

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

const wallet = new ethers.Wallet(
  process.env.PRIVATE_KEY,
  provider
);

const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  abi,
  wallet
);

export async function anchorExpense(expenseId, groupId, hash) {

  const tx = await contract.anchorExpense(
    expenseId,
    groupId,
    hash
  );

  await tx.wait();

  return tx.hash;
}

export async function anchorSettlement(settlementId, groupId, hash) {

  const tx = await contract.anchorSettlement(
    settlementId,
    groupId,
    hash
  );

  await tx.wait();

  return tx.hash;
}

export async function anchorLedgerEntry(entryId, groupId, hash) {

  const tx = await contract.anchorLedgerEntry(
    entryId,
    groupId,
    hash
  );

  await tx.wait();

  return tx.hash;
}

export async function verifyRecord(referenceId, hash) {

  return await contract.verifyRecord(
    referenceId,
    hash
  );
}