import { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import { Context, Next } from "hono";

export interface AppBindings {
  Variables: {};
}
export type AppOpenAPI = OpenAPIHono<AppBindings>;
export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;
