import expressRouter from "express";
import {
  createUser,
  login,
  confirmEmail,
} from "../controllers/auth.controller";

const router = expressRouter();

router.post("/", createUser);
router.post("/login", login);
router.post("/confirm-email/:emailToken", confirmEmail);

export default router;
