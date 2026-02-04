"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5001;
const MONGO_URL = process.env.MONGO_URL || "no-mongo-uri";
mongoose_1.default
    .connect(MONGO_URL)
    .then(() => {
    console.log("Connected to MongoDB");
    app_1.default.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    });
})
    .catch((err) => console.error("Error connection to MongoDB:", err));
