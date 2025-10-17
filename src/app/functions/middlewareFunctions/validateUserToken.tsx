import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { config } from "@/app/config/envConfiguration";
export const validateUserToken = (req: NextRequest): boolean => {
  const token = req.cookies.get("userToken")?.value;
  if (!token) {
    return false;
  }
  if (!config.passwordSecret) {
    return false;
  }
  try {
    jwt.verify(token, config.passwordSecret!);
    return true;
  } catch (err) {
    return false;
  }
};
