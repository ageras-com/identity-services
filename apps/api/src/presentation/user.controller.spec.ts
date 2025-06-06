import { UserController } from "./user.controller"
import { Test, TestingModule } from "@nestjs/testing"
import { UserModule } from "../shared/user.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import { dataSourceOptions } from "../infrastructure/config/typeorm/typeorm"
import { DataSource, QueryRunner } from "typeorm"
import { faker } from "@faker-js/faker/locale/en"
import { UserDto } from "../application/dtos/user.dto"

describe("UserController", () => {
  let userIdsCreated: Set<string> = new Set<string>()
  let userController: UserController
  let queryRunner: QueryRunner

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(dataSourceOptions), UserModule],
    }).compile()

    userController = app.get<UserController>(UserController)

    const dataSource = new DataSource(dataSourceOptions)
    await dataSource.initialize()
    queryRunner = dataSource.createQueryRunner()
  })

  afterEach(async () => {
    if (userIdsCreated.size > 0) {
      await queryRunner.query(`DELETE
                               FROM "user"
                               WHERE id IN (${Array.from(userIdsCreated)
                                 .map((id) => `'${id}'`)
                                 .join(", ")})`)
      await queryRunner.release()
      userIdsCreated = new Set<string>()
    }
  })

  describe("createUser", () => {
    it("should create and return a new user object", async () => {
      await createUser()
    })
  })

  describe("getUser", () => {
    it("should return a user object", async () => {
      const user = await createUser()

      const result = await userController.getUserById(user.id)
      expect(result.id).toEqual(user.id)
      expect(result.name).toEqual(user.name)
    })
  })

  describe("getUsers", () => {
    it("should return a list of users", async () => {
      await createUser()
      await createUser()

      const result = await userController.getUsers()
      expect(result.length).toBeGreaterThan(1)
    })
  })

  const createUser = async (): Promise<UserDto> => {
    const newUser = { name: faker.person.firstName() }
    const result = await userController.createUser(newUser)
    userIdsCreated.add(result.id)
    expect(result.name).toEqual(newUser.name)
    return result
  }
})
