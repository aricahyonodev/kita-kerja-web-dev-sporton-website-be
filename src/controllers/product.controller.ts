import { Request, Response } from "express";
import Product from "../models/product.models";

const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productData = req.body;

    if (req.file) {
      productData.imageurl = req.file.path;
    }

    const product = new Product(productData);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

const getProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.find()
      .populate("category")
      .sort({ createdAt: -1 });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
      res.status(400).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productData = req.body;
    if (req.file) {
      productData.imageUrl = req.file.path;
    }

    const productId = req.params.id;
    const product = await Product.findByIdAndUpdate(productId, productData, {
      new: true,
    });

    if (!product) {
      res.status(400).json({ message: "Product Not Found" });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error Updating product", error });
  }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      res.status(400).json({ message: "Product Not Found" });
      return;
    }

    res.status(200).json({message: "Product deleted succesfully ", productId});
  } catch (error) {
    res.status(500).json({ message: "Error Deleting product", error });
  }
};


export {createProduct, getProduct, getProductById, updateProduct, deleteProduct};