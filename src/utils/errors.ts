import { Context } from "hono";
import { ENV } from "@/utils/env";

export class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (error: unknown, context: Context) => {
  const statusCode = error instanceof HttpError ? error.statusCode : 500;
  const message =
    error instanceof Error ? error.message : "Unknown error occurred";
  const isDevelopment = ENV.NODE_ENV === "development";
  const response = {
    message,
    statusCode,
    ...(isDevelopment && error instanceof Error && { stack: error.stack }),
  };

  return context.json(response, { status: statusCode });
};
