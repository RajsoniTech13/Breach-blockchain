import axios from "axios";
import { generateExpenseHash } from "./utils/hashGenerator.js";

async function storeExpenseOnBlockchain(expense) {

  /*
  Step 1 — Generate Hash
  */

  const hash = generateExpenseHash(expense);

  console.log("Generated Hash:", hash);

  /*
  Step 2 — Call Blockchain API
  */

  const response = await axios.post(
    "http://localhost:4001/blockchain/expense",
    {
      expenseId: expense.id,
      groupId: expense.groupId,
      hash: hash
    }
  );

  console.log("Blockchain Response:", response.data);
}

/*
Example DB record
*/

const expense = {
  id: "exp00331",
  groupId: "grp301",
  paidByUserId: "user01",
  amount: 100,
  currency: "INR",
  category: "Food",
  description: "Dinner",
  expenseDate: "2026-03-13"
};

/*
Run integration
*/

storeExpenseOnBlockchain(expense);