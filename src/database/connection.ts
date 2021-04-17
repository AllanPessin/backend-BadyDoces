import { createConnection } from "typeorm";

try {
  createConnection().then(() => console.log("Banco de dados conectado"));
} catch (error) {
  console.log(error);
}
