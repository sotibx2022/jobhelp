import mongoose, { Schema } from "mongoose";
import { registerFormSchema } from "../types/userAuth";
import z from "zod";
type registerUserType = z.infer<typeof registerFormSchema>
interface userSchemaDocument extends registerUserType, Document {
}
const userSchema = new Schema<userSchemaDocument>({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    score:{type:Number,required:true,default:0}
})
export const UserModel = mongoose.models.User || mongoose.model("User", userSchema)
