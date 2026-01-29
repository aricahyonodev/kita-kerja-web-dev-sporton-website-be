import express from "express";
import cors from "cors";
import router from "./routes/auth.router";
import { authenticate } from "./middlewares/auth.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", router)

app.get("/", (req, res)=>{
    res.send("Hello Express!")
})

app.get("/test-middleware", authenticate,(req, res)=>{
    res.send("Hore, kamu bisa akses homepage")
})

export default app;