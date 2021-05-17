module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [
    "src/models/**{.ts,.js}",
  ],
  migrations: [
    "src/database/migrations/**{.ts,.js}",
  ],
  cli: {
    migrationsDir: "src/database/migrations",
  },
};
