import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/products", async (req, res) => {
  try {
    const { price, expense } = req.body;

    const product = new Product({ price, expense });

    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
