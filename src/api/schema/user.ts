import { z } from "@hono/zod-openapi";

export const signUpSchema = z.object({
  name: z
    .string({ required_error: "name is required" })
    .min(2, "name is required"),
  email: z.string().email({ message: "invalid email" }),
  phone: z
    .string()
    .min(10, "phone must be 10 digits")
    .max(10, "phone must be 10 digits")
    .optional(),
  password: z
    .string()
    .min(8, "password must be at least 8 characters")
    .max(60, "password maximum length is 60 characters"),
});

export type signUpSchemaType = z.infer<typeof signUpSchema>;
