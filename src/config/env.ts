import { z } from "zod";

const EnvSchema = z.object({
  DATABASE_URL: z.string().default("mysql://root:password@localhost:3306/apexify_resort"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(3000),
  NEXT_PUBLIC_APP_URL: z.string().default("http://localhost:3000"),
  NEXT_PUBLIC_APP_NAME: z.string().default("Apexify Resort"),
  BOOKING_HOLD_EXPIRY_MINUTES: z.coerce.number().default(15),
  DEFAULT_CURRENCY: z.string().default("INR"),
  RESORT_TIMEZONE: z.string().default("Asia/Kolkata"),
});

export const env = EnvSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  BOOKING_HOLD_EXPIRY_MINUTES: process.env.BOOKING_HOLD_EXPIRY_MINUTES,
  DEFAULT_CURRENCY: process.env.DEFAULT_CURRENCY,
  RESORT_TIMEZONE: process.env.RESORT_TIMEZONE,
});
