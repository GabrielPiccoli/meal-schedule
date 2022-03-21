import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: profile_id } = verify(token, auth.secret_token) as IPayload;
    req.profile = { id: profile_id };

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}
