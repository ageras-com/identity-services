import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { INestApplication } from "@nestjs/common"

export const configureSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle("Identity Service API")
    .setDescription("API for managing user identities")
    .setVersion("1.0")
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, documentFactory)
}
