import express from "express";
import Medicine from "../models/Medicine.js";

const router = express.Router();

// ✅ POST Route for Adding Medicine
router.post("/add", async (req, res) => {
  try {
    const { name, description, uses, sideEffects, dosage, price, prescriptionRequired } = req.body;

    // Check if the required fields are provided
    if (!name || !dosage || !price) {
      return res.status(400).json({ success: false, message: "Name, dosage, and price are required!" });
    }

    const medicine = new Medicine({
      name,
      description,
      uses,
      sideEffects,
      dosage,
      price,
      prescriptionRequired,
    });

    await medicine.save();
    res.status(201).json({ success: true, medicine });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ GET Route for Fetching All Medicines
router.get("/", async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.status(200).json({ success: true, medicines });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
// ✅ Get a specific medicine by ID
router.get("/:id", async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      return res.status(404).json({ success: false, message: "Medicine not found!" });
    }

    res.status(200).json({ success: true, medicine });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
// ✅ Update a medicine
router.put("/:id", async (req, res) => {
  try {
    const updatedMedicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Return updated medicine
    );

    if (!updatedMedicine) {
      return res.status(404).json({ success: false, message: "Medicine not found!" });
    }

    res.status(200).json({ success: true, medicine: updatedMedicine });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
// ✅ Delete a medicine
router.delete("/:id", async (req, res) => {
  try {
    const deletedMedicine = await Medicine.findByIdAndDelete(req.params.id);

    if (!deletedMedicine) {
      return res.status(404).json({ success: false, message: "Medicine not found!" });
    }

    res.status(200).json({ success: true, message: "Medicine deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});



export default router;
