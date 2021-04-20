"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
require("./database/connection.js");
var server = express_1.default();
server.use(express_1.default.json());
server.listen(process.env.PORT || 3000, function () { return console.log("Server is Running!"); });
