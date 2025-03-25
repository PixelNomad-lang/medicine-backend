import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import medicineRoutes from "./routes/medicineRoutes.js"; // ✅ Import Routes

dotenv.config();
const app = express();

app.use(express.json()); // ✅ Ensure JSON Middleware
app.use(cors());

// ✅ Use Medicine Routes
app.use("/medicines", medicineRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully!");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));
