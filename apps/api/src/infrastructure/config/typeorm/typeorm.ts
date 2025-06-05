import { DataSource, DataSourceOptions } from "typeorm"
import entities from "./entities"
import migrations from "../../../../migrations"
import env from "./../env"

export const dataSourceOptions = {
  type: "postgres",
  host: env.database.host,
  port: env.database.port,
  username: env.database.username,
  password: env.database.password,
  database: env.database.name,
  synchronize: false,
  migrationsRun: false,
  entities,
  migrations,
} satisfies DataSourceOptions

/**
 * TypeORM expects a DataSource instance export when running migrations in the config file
 * This should not be used for anything else
 */
export const migrationDataSource = new DataSource(dataSourceOptions)
