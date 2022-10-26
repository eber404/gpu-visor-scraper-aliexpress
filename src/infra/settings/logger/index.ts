import pino from "pino";

type Layer = "DOMAIN" | "APPLICATION" | "INFRA";
type Level = "ERROR" | "WARNING" | "INFO" | "DEBUG";

interface LogMessage<T = unknown> {
  layer: Layer;
  stack: string;
  level: Level;
  message: T;
}

class LoggerSingleton {
  private readonly log = pino({});
  private static _instance: LoggerSingleton;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static create() {
    if (!this._instance) {
      this._instance = new LoggerSingleton();
    }

    return this._instance;
  }

  public error(message: Omit<LogMessage, "level">) {
    this.log.error({
      ...message,
      level: "ERROR",
    });
  }

  public warn(message: Omit<LogMessage, "level">) {
    this.log.debug({
      ...message,
      level: "WARNING",
    });
  }

  public info(message: Omit<LogMessage, "level">) {
    this.log.error({
      ...message,
      level: "INFO",
    });
  }

  public debug(message: Omit<LogMessage, "level">) {
    this.log.debug({
      ...message,
      level: "DEBUG",
    });
  }
}

export const Logger = Object.freeze(LoggerSingleton.create());
