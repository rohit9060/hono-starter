import { Context, Next } from "hono";

const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  bold: "\x1b[1m",
  underline: "\x1b[4m",
};

class Logger {
  private formatTime(): string {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Use 24-hour format
    };
    return new Date().toLocaleString("en-US", options);
  }

  public error(data: string, error?: Error) {
    const logEntry = {
      time: this.formatTime(),
      level: "ERROR",
      message: data,
      error: error ? error.message : undefined,
    };

    console.error(`${colors.red}${JSON.stringify(logEntry)}${colors.reset}`);
  }

  public info(data: string) {
    const logEntry = {
      time: this.formatTime(),
      level: "INFO",
      message: data,
    };

    console.info(`${colors.blue}${JSON.stringify(logEntry)}${colors.reset}`);
  }

  public logRequest(
    method: string,
    url: string,
    status: number,
    duration: number
  ) {
    const statusColor =
      status >= 500
        ? colors.red
        : status >= 400
        ? colors.yellow
        : status >= 300
        ? colors.cyan
        : colors.green;

    const currentTime = this.formatTime();

    // Log the request with colored output
    console.info(
      `${colors.blue}${currentTime}${colors.reset} ${colors.magenta}${method}${colors.reset} ${colors.underline}${url}${colors.reset} - ${statusColor}${status}${colors.reset} - ${colors.yellow}${duration}ms${colors.reset}`
    );

    // Create the JSON log entry for the request
    const logEntry = {
      time: currentTime,
      method,
      url,
      status,
      duration,
    };

    // Log in JSON format (without colors)
    console.info(`${colors.green}${JSON.stringify(logEntry)}${colors.reset}`);
  }
}

export const logger = new Logger();

export const appLogger = async (c: Context, next: Next) => {
  const method = c.req.method;
  const url = c.req.url;
  const startTime = Date.now();

  await next();

  const status = c.res.status;
  const endTime = Date.now();
  const duration = endTime - startTime;

  // Log the request details with colors and JSON format
  logger.logRequest(method, url, status, duration);
};
