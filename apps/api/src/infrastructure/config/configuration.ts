export interface EnvironmentVariables {
  port: number
  database: {
    type: string
    host: string
  }
}

export default (): EnvironmentVariables => ({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 4001,
  database: {
    type: process.env.DB_TYPE || "postgres",
    host: process.env.DB_HOST || "localhost",
  },
})
