import { MiddlewareHandler } from "hono";

export const tokenMiddleware: MiddlewareHandler = async (c, next) => {
  console.log("token middleware");
  return next();
};
