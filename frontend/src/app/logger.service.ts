import { Injectable } from '@angular/core';

type Log = {
  hostname: string;
  log: any;
  level: string;
};

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() {
    //fluentlogger.configure("docker", {
    //  host: "log",
    //  port: 24224,
    //  timeout: 3.0,
    //  reconnectInterval: 600000,  // 10minutes
    //});
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
    let log: Log = {hostname: "frontend", log: content, level: level};
    //fluentlogger.emit(level, log);
    fetch("http://192.168.1.84:24225/docker.frontend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(log),
    });
    //})
    //.then((data) => {
    //  console.log(data);
    //})
    //.catch((error) => {
    //  console.log(error);
    //});
  }
}
