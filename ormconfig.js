module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  sl: {
    rejectUnauthorized: false,
  },
  entities: [
    "src/database/models/**.ts",
  ],
  migrations: [
    "src/database/migrations/**.ts",
  ],
  cli: {
    migrationsDir: "src/database/migrations",
  },
};
