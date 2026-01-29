import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || "5001";
const MONGO_URL = process.env.MONGO_URL || "no-mongo-uri";

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("Error connection to MongoDB:", err));
