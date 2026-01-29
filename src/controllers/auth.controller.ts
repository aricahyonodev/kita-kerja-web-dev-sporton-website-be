import { Request, Response } from "express";
import User from "../models/user.models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { log } from "console";

const JWT_SECRET = process.env.JWT_SECRET || "Sporton123";

const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "Invalid Credentials, Email not found" });
      return;
    }

    // Validation Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid Credential, wrong password" });
      return;
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
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
  } catch (error) {
    console.error("Signin Error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const initiateAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    const count = await User.countDocuments({});
    if (count > 0) {
      res.status(400).json({
        message:
          "we can only have 1 main admin user, if you want to create user, please delete the user manually from the database",
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });

    await newUser.save();

    res.status(201).json({ message: "Admin user created sucessfully!" });
  } catch (error) {
    console.error(`Initiate new admin user error: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export { initiateAdmin, signin}