import express from "express";

import {
  anchorExpense,
  anchorSettlement,
  anchorLedgerEntry,
  verifyRecord
} from "../services/blockchainService.js";

import {
  generateExpenseHash,
  generateSettlementHash,
  generateLedgerHash
} from "../utils/hashGenerator.js";

const router = express.Router();



/*
==========================
STORE EXPENSE
==========================
Backend sends raw expense record
*/

router.post("/expense", async (req, res) => {

  try {

    const expense = req.body;

    const hash = generateExpenseHash(expense);

    const txHash = await anchorExpense(
      expense.id,
      expense.groupId,
      hash
    );

    res.json({
      success: true,
      type: "expense",
      referenceId: expense.id,
      hash,
      txHash
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

});



/*
==========================
STORE SETTLEMENT
==========================
*/

router.post("/settlement", async (req, res) => {

  try {

    const settlement = req.body;

    const hash = generateSettlementHash(settlement);

    const txHash = await anchorSettlement(
      settlement.id,
      settlement.groupId,
      hash
    );

    res.json({
      success: true,
      type: "settlement",
      referenceId: settlement.id,
      hash,
      txHash
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

});



/*
==========================
STORE LEDGER ENTRY
==========================
*/

router.post("/ledger", async (req, res) => {

  try {

    const entry = req.body;

    const hash = generateLedgerHash(entry);

    const txHash = await anchorLedgerEntry(
      entry.id,
      entry.referenceId,
      hash
    );

    res.json({
      success: true,
      type: "ledger",
      referenceId: entry.id,
      hash,
      txHash
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

});



/*
==========================
VERIFY EXPENSE
==========================
*/

router.post("/verify-expense", async (req, res) => {

  try {

    const expense = req.body;

    const hash = generateExpenseHash(expense);

    const valid = await verifyRecord(expense.id, hash);

    res.json({
      type: "expense",
      referenceId: expense.id,
      hash,
      blockchainValid: valid,
      integrity: valid === true
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

});



/*
==========================
VERIFY SETTLEMENT
==========================
*/

router.post("/verify-settlement", async (req, res) => {

  try {

    const settlement = req.body;

    const hash = generateSettlementHash(settlement);

    const valid = await verifyRecord(settlement.id, hash);

    res.json({
      type: "settlement",
      referenceId: settlement.id,
      hash,
      blockchainValid: valid,
      integrity: valid === true
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

});



/*
==========================
VERIFY LEDGER
==========================
*/

router.post("/verify-ledger", async (req, res) => {

  try {

    const entry = req.body;

    const hash = generateLedgerHash(entry);

    const valid = await verifyRecord(entry.id, hash);

    res.json({
      type: "ledger",
      referenceId: entry.id,
      hash,
      blockchainValid: valid,
      integrity: valid === true
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

});


export default router;