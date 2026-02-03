import { Request, Response } from "express";
import Category from "../models/category.models";

const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const categoryData = req.body;

    if (req.file) {
      categoryData.imageUrl = req.file.path;
    }

    const category = new Category(categoryData);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: "Error creating Category" });
  }
};

const getCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(201).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Error fetching Category" });
  }
};

const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: "Error fetching Category" });
  }
};

const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const categoryData = req.body;
    if (req.file) {
      categoryData.imageUrl = req.file.path;
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      categoryData,
      { new: true },
    );
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: "Error updating Category" });
  }
};

const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const categoryData = req.body;
    if (req.file) {
      categoryData.imageUrl = req.file.path;
    }
    const categoryId = req.params.id;
    const category = await Category.findByIdAndDelete(categoryId);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res
      .status(200)
      .json({ message: `Category deleted succesfully ${categoryId}` });
  } catch (err) {
    res.status(500).json({ message: "Error deleting Category" });
  }
};


export {createCategory, getCategory, getCategoryById, updateCategory, deleteCategory}