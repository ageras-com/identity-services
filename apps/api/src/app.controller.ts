import {Controller, Get, Logger} from "@nestjs/common"
import { AppService } from "./app.service"

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const logger = new Logger("AppController")
    logger.log("Ping Hello World!")
    return this.appService.getHello()
  }
}
