import { Test, TestingModule } from "@nestjs/testing"
import { AppController } from "./app.controller"

describe("AppController", () => {
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe("root", () => {
    it('should return "Ping Hello World!"', () => {
      expect(appController.getHello()).toBe("Ping Hello World!")
    })
  })
})
