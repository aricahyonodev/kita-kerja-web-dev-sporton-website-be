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
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getCategory = exports.createCategory = void 0;
const category_models_1 = __importDefault(require("../models/category.models"));
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryData = req.body;
        if (req.file) {
            categoryData.imageUrl = req.file.path;
        }
        const category = new category_models_1.default(categoryData);
        yield category.save();
        res.status(201).json(category);
    }
    catch (err) {
        res.status(500).json({ message: "Error creating Category" });
    }
});
exports.createCategory = createCategory;
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_models_1.default.find().sort({ createdAt: -1 });
        res.status(201).json(categories);
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching Category" });
    }
});
exports.getCategory = getCategory;
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_models_1.default.findById(req.params.id);
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.status(200).json(category);
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching Category" });
    }
});
exports.getCategoryById = getCategoryById;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryData = req.body;
        if (req.file) {
            categoryData.imageUrl = req.file.path;
        }
        const category = yield category_models_1.default.findByIdAndUpdate(req.params.id, categoryData, { new: true });
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.status(200).json(category);
    }
    catch (err) {
        res.status(500).json({ message: "Error updating Category" });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryData = req.body;
        if (req.file) {
            categoryData.imageUrl = req.file.path;
        }
        const categoryId = req.params.id;
        const category = yield category_models_1.default.findByIdAndDelete(categoryId);
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res
            .status(200)
            .json({ message: `Category deleted succesfully ${categoryId}` });
    }
    catch (err) {
        res.status(500).json({ message: "Error deleting Category" });
    }
});
exports.deleteCategory = deleteCategory;
