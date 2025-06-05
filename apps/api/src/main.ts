import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ConfigService } from "@nestjs/config"
import { EnvironmentVariables } from "./infrastructure/config/configuration"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService =
    app.get<ConfigService<EnvironmentVariables, true>>(ConfigService)
  const port = configService.get("database.type", { infer: true })

  await app.listen(port)
}

void bootstrap()
