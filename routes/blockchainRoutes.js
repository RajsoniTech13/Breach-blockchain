import express from "express";
import { anchorExpense } from "../services/blockchainService.js";

const router = express.Router();

router.post("/expense", async (req, res) => {

  const { expenseId, groupId, hash } = req.body;

  const tx = await anchorExpense(expenseId, groupId, hash);

  res.json({
    success: true,
    txHash: tx
  });

});

export default router;