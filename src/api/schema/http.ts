import { z } from "zod";

export const HTTP_OK = {
  content: {
    "application/json": {
      schema: z.object({
        message: z.string(),
        statusCode: z.number(),
        data: z.object({}).optional(),
      }),
    },
  },
  description: "success",
};

export const HTTP_CREATED = {
  content: {
    "application/json": {
      schema: z.object({
        message: z.string(),
        statusCode: z.number(),
        data: z.object({}).optional(),
      }),
    },
  },
  description: "created",
};

export const HTTP_NOT_FOUND = {
  content: {
    "application/json": {
      schema: z.object({
        message: z.string(),
        statusCode: z.number(),
      }),
    },
  },
  description: "not found",
};

export const HTTP_BAD_REQUEST = {
  content: {
    "application/json": {
      schema: z.object({
        message: z.string(),
        statusCode: z.number(),
      }),
    },
  },
  description: "bad request",
};

export const HTTP_UNAUTHORIZED = {
  content: {
    "application/json": {
      schema: z.object({
        message: z.string(),
        statusCode: z.number(),
      }),
    },
  },
  description: "unauthorized",
};

export const HTTP_INTERNAL_SERVER_ERROR = {
  content: {
    "application/json": {
      schema: z.object({
        message: z.string(),
        statusCode: z.number(),
      }),
    },
  },
  description: "internal server error",
};
