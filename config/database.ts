import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../models/User.model";
import { OTP } from "../models/OTP.model";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT!),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD : "",
  database: process.env.DATABASE_NAME,
  entities: [User, OTP],
  synchronize: true,

  //@ts-ignore
  cli: {
    entitiesDir: "src/apps/**/*.entity{.ts,.js}",
    migrationsDir: "src/migration",
  },
});
