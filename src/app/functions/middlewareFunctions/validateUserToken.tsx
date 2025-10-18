import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "@/app/config/envConfiguration";
export const validateUserToken = (req: NextRequest): string | null => {
  const token = req.cookies.get("userToken")?.value;
  if (!token || !config.passwordSecret) {
    return null;
  }
  try {
    const decoded = jwt.verify(token, config.passwordSecret!) as JwtPayload;
    // assuming your token payload contains "userId"
    return decoded.userId || null;
  } catch (err) {
    return null;
  }
};
