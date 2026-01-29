import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 5001;
const MONGO_URL = process.env.MONGO_URL || "no-mongo-uri";

// Connect MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");

    // LOCAL development
    if (process.env.NODE_ENV !== "production") {
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    }
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));