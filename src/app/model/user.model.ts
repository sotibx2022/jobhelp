import mongoose, { Schema, Document } from "mongoose";
import { registerFormSchema, SingleJobTitle } from "../types/userAuth";
import z from "zod";
type RegisterUserType = z.infer<typeof registerFormSchema>;
interface UserSchemaDocument extends RegisterUserType, Document {
  jobTitles: SingleJobTitle[];
}
const SingleJobTitleSchema = new Schema<SingleJobTitle>({
  title: { type: String, required: true },
  score: { type: Number, required: true, default: 0 },
});
const userSchema = new Schema<UserSchemaDocument>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  jobTitles: { type: [SingleJobTitleSchema], default: [] }, // ✅ use schema, not type
});
export const UserModel =
  mongoose.models.User || mongoose.model<UserSchemaDocument>("User", userSchema);
