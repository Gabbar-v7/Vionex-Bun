import { email, z } from "zod";

export const zAuthFields = {
  name: z.string().min(5).max(50),
  email: z.email(),
  password: z.string().min(8).max(32),
  rememberMe: z.string().transform((val) => val === "on"),
} as const;

export const zAuthSchemas = {
  signUp: z
    .object({
      name: zAuthFields.name,
      email: zAuthFields.email,
      password: zAuthFields.password,
      confirmPassword: zAuthFields.password,
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }),
  signIn: z.object({
    email: zAuthFields.email,
    password: zAuthFields.password,
    rememberMe: zAuthFields.rememberMe,
  }),
  changePassword: z
    .object({
      currentPassword: zAuthFields.password,
      newPassword: zAuthFields.password,
      confirmPassword: zAuthFields.password,
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }),
  forgotPassword: z.object({
    email: zAuthFields.email,
  }),
  resetPassword: z
    .object({
      newPassword: zAuthFields.password,
      confirmPassword: zAuthFields.password,
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }),
} as const;
