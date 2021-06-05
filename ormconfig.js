module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [
    "dist/models/**.{ts, js}",
  ],
  migrations: [
    "dist/database/migrations/**.{ts, js}",
  ],
  cli: {
    migrationsDir: "src/database/migrations",
  },
};
