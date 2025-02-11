import { z } from "zod";

export const signUpFormSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Full Name must be a string",
      required_error: "Full Name is required",
    })
    .min(3, { message: "Minimum 3 characters " })
    .max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(32, {
      message: "Password must be at most 32 characters long",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    })
    .trim(),
  phone: z.string().min(11).max(14).trim(),
});

export const signInFormSchema = z
  .object({})
  .merge(signUpFormSchema.pick({ email: true, password: true }));

export const passwordChangeSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long",
      })
      .max(32, {
        message: "Password must be at most 32 characters long",
      })
      .trim(),
    newPassword: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long",
      })
      .max(32, {
        message: "Password must be at most 32 characters long",
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      })
      .trim(),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long",
      })
      .max(32, {
        message: "Password must be at most 32 characters long",
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number ",
      })
      .trim(),
  })
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export const ProfileFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  number: z
    .string()
    .min(11, "Phone number must be at least 11 characters")
    .trim(),
  avatar: z.string().optional(),
  verifed: z.boolean().optional(),
});
