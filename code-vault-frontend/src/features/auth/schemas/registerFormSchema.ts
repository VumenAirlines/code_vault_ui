import * as z from "zod";

export const registerFormSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.string().min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Passwords must match"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });
