import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import env from "./infrastructure/config/env"
import { configureSwagger } from "./infrastructure/config/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  configureSwagger(app)

  await app.listen(env.port)
}

void bootstrap()
