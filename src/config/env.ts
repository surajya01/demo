import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(3000),
  NEXT_PUBLIC_APP_URL: z.string().default("http://localhost:3000"),
  NEXT_PUBLIC_APP_NAME: z.string().default("Apexify Resort"),
  DEFAULT_CURRENCY: z.string().default("INR"),
  RESORT_TIMEZONE: z.string().default("Asia/Kolkata"),
});

export const env = EnvSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  DEFAULT_CURRENCY: process.env.DEFAULT_CURRENCY,
  RESORT_TIMEZONE: process.env.RESORT_TIMEZONE,
});
