import z from "zod";
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
// Explanation:
// - Minimum 8 characters
// - At least one uppercase letter
// - At least one lowercase letter
// - At least one number
// - At least one special character (@$!%*?&)
export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      passwordRegex,
      "Password must include upper & lower case letters, a number, and a special character"
    ),
});
export const registerFormSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        passwordRegex,
        "Password must include upper & lower case letters, a number, and a special character"
      ),
    fullName: z
      .string()
      .min(3, "Full name must be at least 3 characters")
      .regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
    score:z.number().min(0).max(100).optional(),
    jobTitles: z.array(z.string()).optional()
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
  export const resetFormSchema = z.object({
    email:z.string().min(1,"Email is Required").email("Please Enter Valid Email"),
    newPassword:z.string().
    min(8,"Minimum 8 Characters are Required").
    regex(passwordRegex,"Password must include upper & lower case letters, a number, and a special character"),
    confirmNewPassword:z.string().min(8,"Please Confirm Password")
  }).refine((data)=>data.newPassword === data.confirmNewPassword,{
    path:['confirmNewPassword'],
    message:"Password do not Match"
  })
export type UserRegisterData = z.infer<typeof registerFormSchema>
export type UserLoginData = z.infer<typeof loginFormSchema>
export type UserResetData = z.infer<typeof resetFormSchema>