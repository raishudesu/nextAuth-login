import { z } from "zod";

export const SigninSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Enter a valid email" }),
  pwd: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password should be at least 6 characters long" }),
});

export const SignupSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .min(3, { message: "Name should be atleast 3 characters long" })
      .max(50, { message: "Name should be less than 50 characters" }),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Enter a valid email" }),
    pwd: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password should be at least 6 characters long" }),
    confirmPwd: z
      .string({ required_error: "Confirm your password" })
      .min(6, { message: "Passwords do not match" }),
  })
  .refine((data) => data.pwd === data.confirmPwd, {
    path: ["confirmPwd"],
    message: "Password do not match",
  });
