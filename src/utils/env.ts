import { config } from "dotenv";
config();

const _ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5000,
};
export const ENV = Object.freeze(_ENV);
