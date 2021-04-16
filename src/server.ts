import "reflect-metadata";
import express from "express";

const server = express();

server.use(express.json());

server.listen(process.env.PORT || 3000, () => console.log("Server is Running!"));
