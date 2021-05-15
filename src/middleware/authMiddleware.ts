import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authmiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const authorization = request.headers.authorization;

  if (!authorization) {
    return response.status(400).json({
      error: "Token is required!"
    });
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    await jwt.verify(token, process.env.SECRET);
    next();
  } catch (erro) {
    return response.status(400).json({
      error: "Token invalid!"
    });
  }
};
