import { registerAs } from "@nestjs/config"

export default registerAs("env", () => ({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 4001,
  database: {
    host: process.env.DB_HOST ?? "localhost",
    port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
    username: process.env.DB_USER ?? "postgres",
    password: process.env.DB_PASSWORD ?? "postgres",
    database: process.env.DB_NAME ?? "identity-services",
  },
}))
