import { verifyExpenseIntegrity } from "./utils/blockchainVerifier.js";

  const expense = {
    id: "exp033145",
    groupId: "grp31175",
    paidByUserId: "user015",
    amount: 2007,
    currency: "INR",
    category: "Food",
    description: "Dinner1",
    expenseDate: "2026-03-13"
  };

const result = await verifyExpenseIntegrity(expense);

console.log(result);