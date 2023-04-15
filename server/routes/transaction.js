import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

router.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post('/transactions', async (req, res) => {
  try {
    const { buyer, amount, productIds } = req.body;

    const transaction = new Transaction({
      buyer,
      amount,
      productIds,
    });

    await transaction.save();

    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
