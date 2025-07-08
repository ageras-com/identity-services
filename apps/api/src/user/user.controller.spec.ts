import { faker } from '@faker-js/faker/locale/en';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { UserModule } from '../user/user.module';
import { UserController } from './user.controller';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { infrastructureModule } from '../infrastructure/infrastructure.module';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserController', () => {
  let userIdsCreated: Set<string> = new Set<string>();
  let userController: UserController;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [infrastructureModule, UserModule],
    }).compile();

    userRepository = app.get<Repository<User>>(getRepositoryToken(User));

    userController = app.get<UserController>(UserController);
  });

  afterEach(async () => {
    if (userIdsCreated.size > 0) {
      // Delete created users from the database
      await userRepository
        .createQueryBuilder()
        .delete()
        .from(User)
        .where('globalUserId IN (:...userIds)', {
          userIds: Array.from(userIdsCreated),
        })
        .execute();

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
    const newUser: CreateUserDto = {
      email: faker.internet.email(),
      phoneNumber: faker.phone.number({ style: 'international' }),
    };
    const result = await userController.createUser(newUser);
    userIdsCreated.add(result.globalUserId);
    expect(result.email).toEqual(newUser.email);
    expect(result.phoneNumber).toEqual(newUser.phoneNumber);
    return result;
  };
});
