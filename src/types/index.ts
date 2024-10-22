import type { OpenAPIHono } from "@hono/zod-openapi";
import { Context, Handler } from "hono";
import type { PinoLogger } from "hono-pino";

export interface AppBindings {
  Variables: {
    logger: PinoLogger;
  };
}
export type AppOpenAPI = OpenAPIHono<AppBindings>;
export type AppContext = Context<AppBindings>;
export type AppHandler = Handler<AppBindings>;
