import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";
expand(config());

const EnvSchema = z.object({
  PORT: z.coerce.number().default(5000),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
});

const _ENV = EnvSchema.parse(process.env);
export const ENV = Object.freeze(_ENV);
