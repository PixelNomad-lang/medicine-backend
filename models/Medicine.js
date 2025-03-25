import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  uses: { type: [String], required: true },
  sideEffects: { type: [String] },
  dosage: { type: String, required: true },
  price: { type: Number, required: true },
  prescriptionRequired: { type: Boolean, default: false },
});

const Medicine = mongoose.model("Medicine", medicineSchema);
export default Medicine;
