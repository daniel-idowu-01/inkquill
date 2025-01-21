import expressRouter from "express";
import {
  handleParaphrase,
  handleSummarize,
  changePassword,
  fetchUser,
  updateUserById
} from "../controllers/user.controller";
import { authToken } from "../middleware/auth";

const router = expressRouter();

router.get("/" , authToken, fetchUser);
router.put("/" , authToken, updateUserById);
router.post("/paraphrase" /* , authToken */, handleParaphrase);
router.post("/summarize" /* , authToken */, handleSummarize);
router.post("/change-password" /* , authToken */, changePassword);

export default router;
