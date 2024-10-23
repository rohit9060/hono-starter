import { createRoute } from "@hono/zod-openapi";
import { HTTP_INTERNAL_SERVER_ERROR, HTTP_OK } from "../schema";
import { AppOpenAPI } from "@/types";
import { Context } from "hono";

export const healthCheckRoute = createRoute({
  tags: ["Health Check"],
  method: "get",
  path: "/",

  responses: {
    200: HTTP_OK,
    500: HTTP_INTERNAL_SERVER_ERROR,
  },
});

export type healthCheckRoute = typeof healthCheckRoute;
export const healthCheckRoutes = (app: AppOpenAPI) => {
  app.openapi(healthCheckRoute, async (c: Context) => {
    return c.json(
      {
        statusCode: 200,
        message: "server is running",
      },
      200
    );
  });
};
