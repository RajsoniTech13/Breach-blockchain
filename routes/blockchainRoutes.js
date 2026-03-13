import express from "express";

import {
  anchorExpense,
  anchorSettlement,
  anchorLedgerEntry,
  verifyRecord
} from "../services/blockchainService.js";

const router = express.Router();

router.post("/expense", async (req, res) => {

  try {

    const { expenseId, groupId, hash } = req.body;

    const txHash = await anchorExpense(
      expenseId,
      groupId,
      hash
    );

    res.json({
      success: true,
      txHash
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

router.post("/settlement", async (req, res) => {

  try {

    const { settlementId, groupId, hash } = req.body;

    const txHash = await anchorSettlement(
      settlementId,
      groupId,
      hash
    );

    res.json({
      success: true,
      txHash
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

router.post("/ledger", async (req, res) => {

  try {

    const { entryId, groupId, hash } = req.body;

    const txHash = await anchorLedgerEntry(
      entryId,
      groupId,
      hash
    );

    res.json({
      success: true,
      txHash
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

router.get("/verify", async (req, res) => {

  try {

    const { referenceId, hash } = req.query;

    const valid = await verifyRecord(
      referenceId,
      hash
    );

    res.json({
      valid
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

export default router;