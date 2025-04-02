"use-strict"
import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import * as path from "path";
dotenv.config();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const msSqlDialect: string = "mssql";
const dbConfigSetup = () => {
  const devType: string = process.env.NODE_ENV?.trim() || "local";
  if (devType && devType === "local") {
    return {
      server: process.env.SERVER,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
      dialect: msSqlDialect,
      authentication: {
        type: 'default',
        options: {
          userName: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
        },
      },
      models: [__dirname + "/models"],
      migrationStorageTableName: "migrations",
      migrationStoragePath: path.resolve(__dirname, "./migrations"),
    };
  } else if (devType && devType === "development") {
    return {
      server: process.env.SERVER,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
      dialect: msSqlDialect,
      authentication: {
        type: 'default',
        options: {
          userName: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
        },
      },
      models: [__dirname + "/models"],
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
      dialect: msSqlDialect,
      migrationStorageTableName: "migrations",
      migrationStoragePath: path.resolve(__dirname, "./migrations"),
      dialectOptions: {
        ssl: {
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



