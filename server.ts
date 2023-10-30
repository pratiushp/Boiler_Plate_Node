import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./config/database";
import { app } from "./config/express";

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  await AppDataSource.initialize()
    .then(() => {
      console.log("Database Connected");
    })

    .catch((error) => {
      console.log("Cannot Connect to DB", error);
    });

  console.log(`Server has been connected ${PORT}`);
});
