import { createRoute } from "@hono/zod-openapi";
import { userControllers } from "../controllers";
import {
  HTTP_BAD_REQUEST,
  HTTP_CREATED,
  HTTP_INTERNAL_SERVER_ERROR,
  signUpSchema,
} from "../schema";
import { AppOpenAPI } from "@/types";

export const signUpRoute = createRoute({
  tags: ["User"],
  method: "post",
  path: "/users/signup",
  request: {
    body: {
      content: {
        "application/json": {
          schema: signUpSchema,
        },
      },
    },
  },

  responses: {
    201: HTTP_CREATED,
    400: HTTP_BAD_REQUEST,
    500: HTTP_INTERNAL_SERVER_ERROR,
  },
});

export type SignUpRoute = typeof signUpRoute;
export const userRoutes = (app: AppOpenAPI) => {
  app.openapi(signUpRoute, userControllers.signup);
};
