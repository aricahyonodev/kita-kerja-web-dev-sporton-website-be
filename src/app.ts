import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.router";
import categoryRouter from "./routes/category.router";
import productRouter from "./routes/product.router";
import { authenticate } from "./middlewares/auth.middleware";
import path from "node:path";

const app = express();

app.use(cors());
app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({limit: "10mb", extended: true}));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/auth", authRouter)
app.use("/api/categories", categoryRouter)
app.use("/api/products", productRouter)

app.get("/", (req, res)=>{
    res.send("Hello Express!")
})

app.get("/test-middleware", authenticate,(req, res)=>{
    res.send("Hore, kamu bisa akses homepage")
})

export default app;