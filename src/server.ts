import express from 'express';

const server = express();
/**
 * Instrui o uso do JSON pelo Node
 */
server.use(express.json());

server.listen(process.env.PORT || 3000, () => console.log("Server is Running!"))