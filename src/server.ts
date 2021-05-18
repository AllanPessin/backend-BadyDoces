import express from "express";
import "reflect-metadata";
import "./database/connection";
import { router } from "./routes";
import cors from "cors";

const server = express();

server.use(cors());

server.use(express.json());

server.use(router);

server.listen(process.env.PORT || 3000, () => console.log("Server is Running!"));
