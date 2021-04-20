module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  // host: "localhost",
  // port: 5432,
  // username: "postgres",
  // password: "31599753",
  // database: "bady-doces",
  // url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [
    "dist/database/models/**.js",
  ],
  migrations: [
    "dist/database/migrations/**.js",
  ],
  cli: {
    migrationsDir: "src/database/migrations",
  },
};
