import express, { Router, Request, Response, NextFunction } from "express";
import axios from "axios";
import multer from "multer";
import FormData from "form-data";
import fs from "fs";
import {
  handleParaphrase,
  handleSummarize,
  changePassword,
  fetchUser,
  updateUserById,
} from "../controllers/user.controller";
import { authToken } from "../middleware/auth";
import { errorHandler } from "../middleware/errorHandler";

// Define interface for request body
interface FileRequestBody {
  file: string;
}

// Initialize Router
const router: Router = express.Router();

// Multer Setup for File Uploads
const upload = multer({ dest: "uploads/" });

router.get("/", authToken, fetchUser);
router.put("/", authToken, updateUserById);
router.post("/paraphrase", handleParaphrase);
router.post("/summarize", handleSummarize);
router.post("/change-password", changePassword);

// Predict PDF Route
router.post(
  "/predict",
  upload.single("file"),
  async (
    req: Request<{}, {}, FileRequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.file) {
        return next(errorHandler(400, "No file uploaded"));
      }

      // Read file stream
      const fileStream = fs.createReadStream(req.file.path);

      // Create FormData object
      const formData = new FormData();
      formData.append("file", fileStream, req.file.originalname);

      // Send PDF to FastAPI server
      const response = await axios.post(
        "http://127.0.0.1:8000/predict_pdf",
        formData,
        {
          headers: { ...formData.getHeaders() },
        }
      );

      // Delete temp file after processing
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting file:", err);
      });

      res.status(200).json({ success: true, message: response.data });
    } catch (error) {
      console.error("Error processing PDF:", error);
      next(error);
    }
  }
);

export default router;
