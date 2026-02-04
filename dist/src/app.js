"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const category_router_1 = __importDefault(require("./routes/category.router"));
const product_router_1 = __importDefault(require("./routes/product.router"));
const bank_router_1 = __importDefault(require("./routes/bank.router"));
const transaction_router_1 = __importDefault(require("./routes/transaction.router"));
const auth_middleware_1 = require("./middlewares/auth.middleware");
const node_path_1 = __importDefault(require("node:path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ limit: "10mb", extended: true }));
app.use("/uploads", express_1.default.static(node_path_1.default.join(__dirname, "../uploads")));
app.use("/api/auth", auth_router_1.default);
app.use("/api/categories", category_router_1.default);
app.use("/api/products", product_router_1.default);
app.use("/api/banks", bank_router_1.default);
app.use("/api/transactions", transaction_router_1.default);
app.get("/", (req, res) => {
    res.send("Hello Express!");
});
app.get("/test-middleware", auth_middleware_1.authenticate, (req, res) => {
    res.send("Hore, kamu bisa akses homepage");
});
exports.default = app;
