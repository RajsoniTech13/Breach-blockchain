import { generateExpenseHash } from "./utils/hashGenerator.js";

/*
Sample expense object
(simulates data from DB)
*/

const expense = {
  id: "exp001",
  groupId: "grp301",
  paidByUserId: "user01",
  amount: 100,
  currency: "INR",
  category: "Food",
  description: "Dinner",
  expenseDate: "2026-03-13"
};

/*
Generate hash
*/

const hash = generateExpenseHash(expense);

console.log("Expense Data:");
console.log(expense);

console.log("\nGenerated Hash:");
console.log(hash);