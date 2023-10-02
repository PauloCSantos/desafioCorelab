import express from "express";
import bodyParser from "body-parser";
import router from "./routes/todoRouter";
import { Sequelize } from "sequelize-typescript";
import TodoModel from "../infraestructure/database/mysql/todo.model";
import cors from "cors";

export const app = express();
export let sequelize: Sequelize;

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());
app.use("/", router);

async function databaseConfig() {
  sequelize = new Sequelize({
    database: "corenotesdatabase",
    username: "root",
    password: "corelab123",
    host: "mysql",
    dialect: "mysql",
    logging: false,
  });
  await sequelize.addModels([TodoModel]);
  await sequelize.sync();
}

databaseConfig();
