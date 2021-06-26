import { Request, Response, NextFunction } from "express";
import { body, ValidationChain, validationResult } from "express-validator";
import HttpResponse from "../helpers/httpResponse";

export const validate = (req: Request, res: Response, next: NextFunction): void => {

  const errors = validationResult(req);
  
  if (errors.isEmpty()) {
    return next()
  }
  
  const extractedErrors: {[k: string]: string}[] = [];

  errors.array().map(e => extractedErrors.push({ [e.param]: e.msg }))
  
  HttpResponse.unprocessable(req, res, extractedErrors)
}

export const isRequired = (fields: string[]): ValidationChain[] => {
  return fields.map(field => body(field).notEmpty())
}

export const isString = (fields: string[]): ValidationChain[] => {
  return fields.map(field => body(field).isString())
}

export const isNumber = (fields: string[]): ValidationChain[] => {
  return fields.map(field => body(field).isNumeric())
}

export const isEmail = (fields: string[]): ValidationChain[] => {
  return fields.map(field => body(field).isEmail())
}

export const isPhonenumber = (fields: string[]): ValidationChain[] => {
  return fields.map(field => body(field).isMobilePhone('id-ID'))
}

export const isDate = (fields: string[]): ValidationChain[] => {
  return fields.map(field => body(field).isDate())
}
