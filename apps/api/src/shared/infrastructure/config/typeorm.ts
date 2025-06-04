import { DataSource, DataSourceOptions } from "typeorm"
import migrationModules from "../../../../migrations"
import entities from "./entities"

export const dataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST ?? "localhost",
  port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
  username: process.env.DB_USER ?? "postgres",
  password: process.env.DB_PASSWORD ?? "postgres",
  database: process.env.DB_NAME ?? "identity-services",
  synchronize: false,
  migrationsRun: false,
  entities: entities,
  migrations: migrationModules,
} satisfies DataSourceOptions

/**
 * TypeORM expects a DataSource instance export when running migrations in the config file
 * This should not be used for anything else
 */
export const migrationDataSource = new DataSource(dataSourceOptions)
