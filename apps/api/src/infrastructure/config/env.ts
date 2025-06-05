import { z } from "zod"

const envSchema = z.object({
  PORT: z.coerce.number().default(4001),
  DB_HOST: z.string().default("localhost"),
  DB_PORT: z.coerce.number().default(5432),
  DB_USERNAME: z.string().default("postgres"),
  DB_PASSWORD: z.string().default("postgres"),
  DB_NAME: z.string().default("identity-services"),
})

// eslint-disable-next-line no-restricted-syntax
const envParsed = envSchema.parse(process.env)

export default {
  port: envParsed.PORT,
  database: {
    host: envParsed.DB_HOST,
    port: envParsed.DB_PORT,
    username: envParsed.DB_USERNAME,
    password: envParsed.DB_PASSWORD,
    name: envParsed.DB_NAME,
  },
}
