import express from "express";
import KPI from "../models/KPI.js";

const router = express.Router();

router.get("/kpis", async (req, res) => {
  try {
    const kpis = await KPI.find();
    res.status(200).json(kpis);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/kpis", async (req, res) => {
  const kpiData = req.body;
  const kpi = new KPI(kpiData);

  try {
    await kpi.save();
    res.status(201).json(kpi);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
