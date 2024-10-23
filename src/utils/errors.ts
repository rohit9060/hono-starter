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

export const errorHandler = (error: unknown, c: Context) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (error instanceof HttpError) {
    statusCode = error instanceof HttpError ? error.statusCode : 500;
    message = error instanceof Error ? error.message : "Unknown error occurred";
  }

  const isDevelopment = ENV.NODE_ENV === "development";

  const response = {
    message,
    statusCode,
    ...(isDevelopment && error instanceof Error && { stack: error.stack }),
  };

  return c.json(response, { status: statusCode });
};

export const notFoundHandler = (c: Context) => {
  return c.json(
    {
      statusCode: 404,
      message: "Not Found",
    },
    404
  );
};
