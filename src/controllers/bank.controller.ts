import { Request, Response } from "express";
import Bank from "../models/bank.models";

const createBank = async (req: Request, res: Response): Promise<void> => {
  try {
    const bank = new Bank(req.body);
    console.log(bank);
    await bank.save();
    res.status(201).json(bank);
  } catch (error) {
    res.status(500).json({ message: "Error creating bank", error });
  }
};

const getBanks = async (req: Request, res: Response): Promise<void> => {
  try {
    const bank = await Bank.find().sort({createdAt: -1});
    res.status(200).json(bank);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bank", error });
  }
};

const updateBank = async (req: Request, res: Response): Promise<void> => {
  try {
    const bank = await Bank.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!bank){
        res.status(404).json({message: "Bank not found"});
        return;
    }
    res.status(200).json(bank);
  } catch (error) {
    res.status(500).json({ message: "Error updating bank", error });
  }
};

const deleteBank = async (req: Request, res: Response): Promise<void> => {
  try {
    const bank = await Bank.findByIdAndDelete(req.params.id);
    if(!bank){
        res.status(404).json({message: "Bank not found"});
        return;
    }

    res.status(200).json({message: "Bank deleted succesfully"});
  } catch (error) {
    res.status(500).json({ message: "Error deleting bank", error });
  }
};

export {createBank, getBanks, updateBank, deleteBank}