import expressRouter from "express";
import { handleParaphrase, handleSummarize } from "../controllers/user.controller";

const router = expressRouter();

router.post("/paraphrase", handleParaphrase);
router.post("/summarize", handleSummarize);

export default router;