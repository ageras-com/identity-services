import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ConfigService } from "@nestjs/config"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get<ConfigService>(ConfigService)
  const port = configService.getOrThrow<number>("env.port")

  await app.listen(port)
}

void bootstrap()
