"use strict";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { dbConnectionConfiguration } from "./configuration";

dotenv.config();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });


const env = process.env.NODE_ENV?.trim() || "local";

const db = () => {
  if (env && env == "local") {
    return dbConnectionConfiguration.local;
  } else if (env && env == "development") {
    return dbConnectionConfiguration.development;
  } else if (env && env == "production") {
    return dbConnectionConfiguration.production;
  }
};

const configuration = db();
const sequelize = new Sequelize(
  configuration?.database || "",
  configuration?.username || "",
  configuration?.password || "",
  configuration?.config
);

export default sequelize;


