module.exports = {
  type: "postgres",
  // url: process.env.DATABASE_URL,
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "31599753",
  database: "bady-doces",
  url: process.env.DATABASE_URL,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
  entities: [
    "src/models/**.ts",
  ],
  migrations: [
    "src/database/migrations/**.ts",
  ],
  cli: {
    migrationsDir: "src/database/migrations",
  },
};
