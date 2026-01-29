// src/server.ts
import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.PORT) || 5001;
const MONGO_URL =
  process.env.MONGO_URL ||
  "mongodb+srv://cahyonoari81_db_user:a723qqkghrmWMeba@cluster0.wplgzjj.mongodb.net/?appName=Cluster0";

if (!MONGO_URL) {
  throw new Error("MONGO_URL not defined in environment variables");
}

// Connection caching for serverless (Vercel)
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URL).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log("Connected to MongoDB");

    // Only listen on local development
    if (process.env.NODE_ENV !== "production") {
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    }
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
