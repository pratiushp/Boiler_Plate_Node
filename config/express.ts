import express from "express";
import morgan from "morgan";
import indexRoute from "../routes/index.route";
import cookieParser from "cookie-parser";
import { errorConverter, notFound } from "../utils/error";
import cors from "cors";

export const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

app.use(express.json());
app.use(morgan("combined"));
app.use(cookieParser());

app.use("/api", indexRoute);

app.use(notFound);
app.use(errorConverter);
