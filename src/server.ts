import { serve } from "@hono/node-server";
import app from "@/app";
import { ENV, logger } from "@/utils";

serve({
  fetch: app.fetch,
  port: ENV.PORT,
});

logger.info("Server is running on http://localhost:" + ENV.PORT);
