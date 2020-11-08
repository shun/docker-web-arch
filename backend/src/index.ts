import { AppServer } from "./server";
import { createConnection } from "typeorm";
import { logger } from "./logger";

async function bootstrap() {
    const server = new AppServer();
    await server.setup();
    await createConnection();
    server.start();
}

//bootstrap();
const d = {
  lastname: "KUDO",
  firstname: "Shunsuke",
  age: 42
}
logger.debug(d);
logger.info(d);

