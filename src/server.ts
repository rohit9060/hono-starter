import { OpenAPIHono, z } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";
import { apiReference } from "@scalar/hono-api-reference";
import { compress } from "hono/compress";

//routes import
import { userRoutes, healthCheckRoutes } from "@/api/routes";

import {
  appLogger,
  ENV,
  errorHandler,
  HttpError,
  logger,
  notFoundHandler,
} from "@/utils";
import { AppBindings } from "./types";

const app = new OpenAPIHono<AppBindings>({
  defaultHook: (result) => {
    if (!result.success) {
      if (result.error instanceof z.ZodError) {
        throw new HttpError(result.error.issues[0].message, 400);
      }
      throw new HttpError("unknown error occurred", 500);
    }
  },
});

// open api config
app.doc("/docs-schema", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Todo App",
    description: "Todo App with ACL & ABAC",
  },
  servers: [
    {
      url: `http://localhost:${ENV.PORT}`,
    },
  ],
});

app.use(
  compress({
    encoding: "gzip",
  })
);

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(appLogger);

// api docs
app.get("/docs", swaggerUI({ url: "/docs-schema" }));

// api reference
app.get(
  "/reference",
  apiReference({
    theme: "bluePlanet",
    layout: "modern",
    defaultHttpClient: {
      targetKey: "javascript",
      clientKey: "fetch",
    },
    spec: {
      url: "/docs-schema",
    },
  })
);

// routes
healthCheckRoutes(app);
userRoutes(app);

// not found
app.notFound(notFoundHandler);
// on error
app.onError(errorHandler);

serve({
  fetch: app.fetch,
  port: Number(ENV.PORT),
});

logger.info("Server started on http://localhost:" + ENV.PORT);
