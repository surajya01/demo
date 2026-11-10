type LogLevel = "debug" | "info" | "warn" | "error";

interface LogPayload {
  message: string;
  context?: string;
  data?: unknown;
  error?: Error | unknown;
}

class Logger {
  private formatLog(level: LogLevel, payload: LogPayload): string {
    const timestamp = new Date().toISOString();
    const contextStr = payload.context ? `[${payload.context}] ` : "";
    return `[${timestamp}] [${level.toUpperCase()}] ${contextStr}${payload.message}`;
  }

  info(message: string, context?: string, data?: unknown): void {
    console.log(this.formatLog("info", { message, context, data }));
    if (data && process.env.NODE_ENV === "development") {
      console.log(data);
    }
  }

  warn(message: string, context?: string, data?: unknown): void {
    console.warn(this.formatLog("warn", { message, context, data }));
  }

  error(message: string, error?: Error | unknown, context?: string): void {
    console.error(this.formatLog("error", { message, context, error }));
    if (error && (error as Error).stack) {
      console.error((error as Error).stack);
    }
  }

  debug(message: string, context?: string, data?: unknown): void {
    if (process.env.NODE_ENV === "development") {
      console.debug(this.formatLog("debug", { message, context, data }));
    }
  }
}

export const logger = new Logger();

