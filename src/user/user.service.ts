import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './user.model';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async getUsers(): Promise<UserDto[]> {
    return await this.userModel.findAll();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userModel.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException(`user with id: ${id} not found`);
    }
    return user;
  }

  async deleteUser(id: number): Promise<any> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundException(`user with id: ${id} not found`);
    }
    await user.destroy();

    return Promise.resolve({
      status: 'succes',
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const { username, email, role, password } = createUserDto;
    const user = new User();
    user.email = email;
    user.username = username;
    user.role = role;
    user.password = bcrypt.hashSync(password, 10);
    return user.save();
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const { role } = updateUserDto;
    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundException(`user with id: ${id} not found`);
    }
    try {
      user.role = role;
      return user.save();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Somethings went wrong.');
    }
  }
}
