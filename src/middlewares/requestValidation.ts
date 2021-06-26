import { Request, Response, NextFunction } from "express";
import { body, ValidationChain, validationResult } from "express-validator";
import HttpResponse from "../helpers/httpResponse";

export const validate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors: { [k: string]: string }[] = [];

  errors.array().map((e) => extractedErrors.push({ [e.param]: e.msg }));

  HttpResponse.unprocessable(req, res, extractedErrors);
};
