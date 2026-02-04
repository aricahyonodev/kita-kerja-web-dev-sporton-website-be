"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.initiateAdmin = void 0;
const user_models_1 = __importDefault(require("../models/user.models"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "Sporton123";
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_models_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid Credentials, Email not found" });
            return;
        }
        // Validation Password
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid Credential, wrong password" });
            return;
        }
        // Generate JWT Token
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, JWT_SECRET, {
            expiresIn: "1d",
        });
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        console.error("Signin Error: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.signin = signin;
const initiateAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = req.body;
        const count = yield user_models_1.default.countDocuments({});
        if (count > 0) {
            res.status(400).json({
                message: "we can only have 1 main admin user, if you want to create user, please delete the user manually from the database",
            });
            return;
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const newUser = new user_models_1.default({
            email,
            password: hashedPassword,
            name,
        });
        yield newUser.save();
        res.status(201).json({ message: "Admin user created sucessfully!" });
    }
    catch (error) {
        console.error(`Initiate new admin user error: ${error}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.initiateAdmin = initiateAdmin;
