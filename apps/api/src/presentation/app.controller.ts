import { Controller, Get, Logger } from "@nestjs/common"

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    const logger = new Logger("AppController")
    logger.log("Ping Hello World!")
    return "Ping Hello World!"
  }
}
