import { createRouter } from "@/app";
import { createRoute, z } from "@hono/zod-openapi";
import { testHandler } from "@/api/controllers";

const router = createRouter().openapi(
  createRoute({
    tags: ["Test"],
    method: "get",
    path: "/test",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
        description: "test",
      },
    },
  }),
  testHandler
);

export { router as testRoutes };
