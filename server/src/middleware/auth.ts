import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { errorHandler } from "./errorHandler";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string } | undefined;
    }
  }
}

export const authToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return next(errorHandler(403, "Forbidden"));
    }

    // Ensure `decoded` has an `id` property or typecast it
    if (typeof decoded === "object" && "id" in decoded) {
      req.user = { id: (decoded as JwtPayload).id as string };
    } else {
      return next(errorHandler(403, "Invalid token payload"));
    }

    next();
  });
};