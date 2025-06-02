import { User } from "../entities/user.entity"
import { CreateUserDto } from "../../application/dtos/create-user.dto"

export abstract class IUserRepository {
  public abstract getUsers(): Promise<User[]>
  public abstract getUserById(id: string): Promise<User | null>
  public abstract createUser(user: CreateUserDto): Promise<User>
}
