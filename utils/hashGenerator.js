import { ethers } from "ethers";


// expense table
export function generateExpenseHash(expense) {

  const canonicalData = [
    expense.id,
    expense.groupId,
    expense.paidByUserId,
    expense.amount,
    expense.currency,
    expense.category,
    expense.description,
    expense.expenseDate
  ].join("|");

  return ethers.keccak256(
    ethers.toUtf8Bytes(canonicalData)
  );
}


// settlement
export function generateSettlementHash(settlement) {

  const canonicalData = [
    settlement.id,
    settlement.groupId,
    settlement.fromUserId,
    settlement.toUserId,
    settlement.amount,
    settlement.currency,
    settlement.settledAt
  ].join("|");

  return ethers.keccak256(
    ethers.toUtf8Bytes(canonicalData)
  );
}


// ledger
export function generateLedgerHash(entry) {

  const canonicalData = [
    entry.id,
    entry.accountId,
    entry.referenceId,
    entry.referenceType,
    entry.amount,
    entry.entryType
  ].join("|");

  return ethers.keccak256(
    ethers.toUtf8Bytes(canonicalData)
  );
}