import { createConnection } from "typeorm";

try {
  createConnection().then(() => console.log("Conncected Database!"));
} catch (error) {
  console.log(error);
}
