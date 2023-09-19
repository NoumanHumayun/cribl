import express from "express";
import cors from "cors";
import { getLogs } from "./services/logs.service";

const app = express();
app.use(cors());
app.use("/logs", (req: express.Request, res: express.Response) =>
  getLogs(req, res)
);
app.use("/", (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Hello World!" });
});

export { app };
