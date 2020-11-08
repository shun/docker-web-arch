import fluentlogger from "fluent-logger";
import os from "os";

type Log = {
  hostname: string;
  log: any;
  level: string;
};

class Logger {

  constructor() {
    fluentlogger.configure("docker", {
      host: "log",
      port: 24224,
      timeout: 3.0,
      reconnectInterval: 600000,  // 10minutes
    });
  }

  public async debug(content: any) {
    this.trace(content, "debug");
  }

  public async info(content: any) {
    this.trace(content, "info");
  }

  public async warn(content: any) {
    this.trace(content, "warn");
  }

  public async error(content: any) {
    this.trace(content, "error");
  }

  private async trace(content: any, level: string) {
    let log: Log = {hostname: os.hostname(), log: content, level: level};
    fluentlogger.emit(level, log);
  }
};

export const logger = new Logger();

