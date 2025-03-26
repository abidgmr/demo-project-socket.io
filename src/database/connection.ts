"use-strict"
import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import mysql2 from "mysql2";
import * as path from "path";
dotenv.config();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
// const caCertPath = path.resolve(__dirname, "ca", "ca.pem");
console.log("DB_NAME", process.env.DB_NAME)
const dbConfigSetup = () => {
  const devType: string = process.env.NODE_ENV?.trim() || "local";
  if (devType && devType === "local") {
    return {
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
      models: [__dirname + "/models"],
      dialect: "mysql",
      migrationStorageTableName: "migrations",
      migrationStoragePath: path.resolve(__dirname, "./migrations"),
    };
  } else if (devType && devType === "development") {
    return {
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
      models: [__dirname + "/models"],
      dialect: "mysql",
      migrationStorageTableName: "migrations",
      migrationStoragePath: path.resolve(__dirname, "./migrations"),
    };
  } else if (devType && devType === "production") {
    return {
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
      models: [__dirname + "/models"],
      dialect: "mysql",
      migrationStorageTableName: "migrations",
      migrationStoragePath: path.resolve(__dirname, "./migrations"),
      dialectModule: mysql2,
      dialectOptions: {
        ssl: {
        //   ca: fs.readFileSync(caCertPath),
          require: true,
          rejectUnauthorized: true,
        },
        connectTimeout: 60000,
      },
      logging: false,
    };
  } else {
    throw new Error("Invalid environment NODE_ENV");
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const devConnection: any = dbConfigSetup();
const sequelize = new Sequelize(devConnection);
export default sequelize;



