import { pinoLogger } from "hono-pino";
import pino from "pino";
import pretty from "pino-pretty";
import { ENV } from "./env";

export function appLogger() {
  return pinoLogger({
    pino: pino(
      {
        level: "info",
      },
      ENV.NODE_ENV === "production" ? undefined : pretty()
    ),
    http: {
      reqId: () => crypto.randomUUID(),
    },
  });
}

function MyLogger() {
  return pino(
    {
      level: "info",
    },
    ENV.NODE_ENV === "production" ? undefined : pretty()
  );
}

export const logger = MyLogger();
