/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const dotenv = require('dotenv');
dotenv.config();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const path = require('path');
const fs = require('fs');
const caCertPath = path.resolve(__dirname, 'ca', 'ca.pem');
const msSqlDialect = "mssql";
module.exports = {
  development: {
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
  },
  local: {
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
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: msSqlDialect,
    migrationStorageTableName: 'migrations',
    migrationStoragePath: path.resolve(__dirname, './migrations'),
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync(caCertPath).toString(),
        require: true,
        rejectUnauthorized: true,
      },
      connectTimeout: 10000,
    },
  },
};