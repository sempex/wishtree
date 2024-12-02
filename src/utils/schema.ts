import { z } from "zod";

export const FormSchemaLogin = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export const FormSchemaSignUp = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(12),
  password: z.string().min(8).max(100),
});

export type User = {
  id: string;
  email?: string;
  username: string;
  userId?: string
}