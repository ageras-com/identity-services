import { faker } from '@faker-js/faker/locale/en';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, QueryRunner } from 'typeorm';
import { dataSourceOptions } from '../infrastructure/config/typeorm/typeorm';
import { UserModule } from '../user/user.module';
import { UserController } from './user.controller';
import { UserDto } from './dto/user.dto';

describe('UserController', () => {
  let userIdsCreated: Set<string> = new Set<string>();
  let userController: UserController;
  let queryRunner: QueryRunner;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(dataSourceOptions), UserModule],
    }).compile();

    userController = app.get<UserController>(UserController);

    const dataSource = new DataSource(dataSourceOptions);
    await dataSource.initialize();
    queryRunner = dataSource.createQueryRunner();
  });

  afterEach(async () => {
    if (userIdsCreated.size > 0) {
      // Delete created users from the database
      await queryRunner.query(`DELETE
                               FROM "Users"
                               WHERE "globalUserId" IN (${Array.from(
                                 userIdsCreated,
                               )
                                 .map((id) => `'${id}'`)
                                 .join(', ')})`);
      await queryRunner.release();
      userIdsCreated = new Set<string>();
    }
  });

  describe('createUser', () => {
    it('should create and return a new user object', async () => {
      await createUser();
    });
  });

  describe('getUser', () => {
    it('should return a user object', async () => {
      const user = await createUser();

      const result = await userController.getUserById(user.globalUserId);
      expect(result.globalUserId).toEqual(user.globalUserId);
      expect(result.email).toEqual(user.email);
    });
  });

  describe('getUsers', () => {
    it('should return a list of users', async () => {
      await createUser();
      await createUser();

      const result = await userController.getUsers();
      expect(result.length).toBeGreaterThan(1);
    });
  });

  const createUser = async (): Promise<UserDto> => {
    const newUser = {
      email: faker.internet.email(),
      name: faker.phone.number({ style: 'international' }),
    };
    const result = await userController.createUser(newUser);
    userIdsCreated.add(result.globalUserId);
    expect(result.email).toEqual(newUser.email);
    return result;
  };
});
