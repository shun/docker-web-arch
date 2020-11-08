import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cors from "cors";
import session from "express-session";

export class AppServer {
  public app: express.Express;
  private server: ApolloServer | null;

  constructor() {
    this.app = express();
    this.server = null;
  }

  public async setup(): Promise<void> {
    this.app.use(cors());
    this.app.use(session({
      secret: "hogehoge",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60
      }
    }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    try {
      const schema = await buildSchema({
        resolvers: [__dirname + "/resolver/**/*.ts"],
      });
      this.server = new ApolloServer({
        schema,
        playground: true,
      });

      this.setupRoutes();
      this.server.applyMiddleware({ app: this.app });


    } catch (err) {
      console.log(err);

    }
  }

  private setupRoutes(): void {
    this.app.get("/", (req, res) => {
      res.json({ message: "AppServer started" });
    });

  }

  public start(): void {
    this.app.listen( {port: 4000}, () => {
      if (this.server) {
        console.log(`server on http://localhost:4000${this.server.graphqlPath}`);
      }
    });
  }
}
