import { OpenAPIHono } from "@hono/zod-openapi";
import { errorHandler, appLogger } from "@/utils";
import { AppBindings, AppOpenAPI } from "@/types";
import { testRoutes } from "@/api/routes";
import { swaggerUI } from "@hono/swagger-ui";
import { apiReference } from "@scalar/hono-api-reference";
import { compress } from "hono/compress";
import { cors } from "hono/cors";

// create App
export function createApp() {
  const app = new OpenAPIHono<AppBindings>({
    strict: false,
  });

  app.use(appLogger());
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
  app.onError(errorHandler);
  app.notFound((c) => {
    return c.json({ message: "Not Found", statusCode: 404 }, 404);
  });

  return app;
}

// open_api,swagger and api_reference
export function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/doc-schema", {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Hono Starter",
    },
    servers: [
      {
        description: "Local Server",
        url: "http://localhost:5000",
      },
      {
        description: "Production Server",
        url: "http://localhost:5001",
      },
    ],
  });

  app.get("/docs", swaggerUI({ url: "/doc-schema" }));

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
        url: "/doc-schema",
      },
    })
  );
}

// create Router
export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
  });
}

const app = createApp();
configureOpenAPI(app);

const routes = [testRoutes];
routes.forEach((route) => {
  app.route("/", route);
});

export default app;
