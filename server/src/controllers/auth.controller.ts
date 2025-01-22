import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../models/index";
import { errorHandler } from "../middleware/errorHandler";
import { emailRegex, passwordRegex } from "../utils/constants";
//import { transporter } from "../utils/emailTransport";
import { validateCreateUser } from "../utils/helpers.js";

// Type definitions for request bodies
interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

const createUser = async (
  req: Request<{}, {}, CreateUserRequest>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let url: string | undefined;
  try {
    const { username, email, password } = req.body;

    const { valid, message } = validateCreateUser(req.body);
    if (!valid) {
      return next(errorHandler(400, message));
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT)
    );
    const isEmail = emailRegex.test(email);
    const validPassword = passwordRegex.test(password);

    const user = await User.findOne({ email });
    if (user) {
      return next(errorHandler(400, "User already exists!"));
    }

    if (!isEmail) {
      return next(errorHandler(400, "Enter a valid email!"));
    }

    const blacklistedDomains = [
      "tempmail.com",
      "mailinator.com",
      "yopmail.org",
      "trashmail.com",
      "maildrop.cc",
    ];
    const blacklistedEmail = email.split("@")[1];
    if (blacklistedDomains.includes(blacklistedEmail)) {
      return next(
        errorHandler(400, "Registration is not allowed for this email!")
      );
    }

    if (!validPassword) {
      return next(
        errorHandler(
          400,
          "Password must have at least one uppercase, one lowercase, one number, one symbol, and be more than 8 characters!"
        )
      );
    }

    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ success: true, message: "User created successfully!" });
  } catch (error) {
    next(error);
  }
};

const login = async (
  req: Request<{}, {}, LoginRequest>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(errorHandler(400, "Email or password is required!"));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(errorHandler(400, "Email not found!"));
    }

    if (!user.emailVerified) {
      return next(errorHandler(401, "Please confirm your email to login!"));
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return next(errorHandler(400, "Wrong credentials!"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    res.status(200).json({ success: true, message: token });
  } catch (error) {
    next(error);
  }
};

const confirmEmail = async (
  req: Request<{ emailToken: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { emailToken } = req.params;
    jwt.verify(
      emailToken,
      process.env.EMAIL_JWT_SECRET!,
      async (err, user: any) => {
        if (err) {
          return next(errorHandler(400, "Invalid email token!"));
        }

        await User.findByIdAndUpdate(user.id, {
          $set: { emailVerified: true },
        });

        res
          .status(201)
          .json({ success: true, message: "Your account has been confirmed!" });
      }
    );
  } catch (error) {
    next(error);
  }
};

export { createUser, login, confirmEmail };
