import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import { User } from "../models/index";
import { errorHandler } from "../middleware/errorHandler";
//import { transporter } from "../utils/emailTransport";
import { CohereClient } from "cohere-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.COHERE_API_KEY;
if (!apiKey) {
  throw new Error("COHERE_API_KEY is required");
}

const cohere = new CohereClient({
  token: apiKey,
});

// Define an interface for request body
interface TextRequestBody {
  text: string;
}

interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

const handleSummarize = async (
  req: Request<{}, {}, TextRequestBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const summarize = await cohere.summarize({
      text: req.body.text,
    });
    console.log("Summarize result:", summarize);
    res.status(200).json({ success: true, summarize });
  } catch (error) {
    console.error("Error in handleSummarize:", error);
    next(error);
  }
};

const handleParaphrase = async (
  req: Request<{}, {}, TextRequestBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const generate = await cohere.generate({
      prompt: `Paraphrase this text: ${req.body.text}`,
    });
    console.log("Generate result:", generate);
    res.status(200).json({ success: true, generate });
  } catch (error) {
    console.error("Error in handleParaphrase:", error);
    next(error);
  }
};

const changePassword = async (
  req: Request<{}, {}, ChangePasswordRequest>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.user as { id: string };
    const { oldPassword, newPassword } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(errorHandler(400, "Input valid ID"));
    }

    if (!oldPassword || !newPassword) {
      return next(errorHandler(400, "Please provide relevant details!"));
    }

    if (oldPassword === newPassword) {
      return next(
        errorHandler(400, "New password cannot be the same as the old one!")
      );
    }

    const userPassword = await User.findById(id).select("password");
    if (!userPassword) {
      return next(errorHandler(400, "User not found!"));
    }

    const oldPasswordMatch = await bcrypt.compare(
      oldPassword,
      userPassword.password
    );
    if (!oldPasswordMatch) {
      return next(errorHandler(400, "Wrong old password!"));
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      Number(process.env.SALT)
    );
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { password: hashedPassword } },
      { new: true }
    );

    if (!user) {
      return next(errorHandler(400, "Password update unsuccessful!"));
    }

    res
      .status(200)
      .json({ success: true, message: "User password successfully updated" });
  } catch (error) {
    next(error);
  }
};

export { handleSummarize, handleParaphrase, changePassword };
