import { LoginCredentialsDto } from './dto/login-creditials.dto';
import { UserDto } from './../user/dto/user.dto';
import { RegisterCredentialsDto } from './dto/register-creditials.dto';
import { User } from '../models/user.model';
import {
  Injectable,
  Logger,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async signUp(
    registerCredentialsDto: RegisterCredentialsDto,
  ): Promise<{ user: UserDto; token: string }> {
    const { username, email, password, role } = registerCredentialsDto;

    const existedUser = await this.userModel.findOne({
      where: { email: email },
    });
    if (existedUser) {
      throw new BadRequestException('this email is already used.');
    }
    try {
      const hashedPassword = bcrypt.hashSync(password, 10);

      const newUser = await this.userModel.create({
        username,
        email,
        password: hashedPassword,
        role,
      });

      const payload = { email: newUser.email };
      const token = this.jwtService.sign(payload);

      console.log(newUser);

      return {
        user: plainToClass(UserDto, newUser),
        token,
      };
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async signIn(
    loginCredentialsDto: LoginCredentialsDto,
  ): Promise<{ user: UserDto; token: string }> {
    const { email, password } = loginCredentialsDto;
    const user = await this.userModel.findOne({
      where: {
        email,
      },
    });
    console.log(user);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) throw new BadRequestException('Invalid credentials');

    const payload: JwtPayload = { id: user.id, email: user.email };

    const token = await this.jwtService.sign(payload);
    this.logger.debug(
      `Generated JWT Token with payload ${JSON.stringify(payload)}`,
    );
    return {
      user: plainToClass(UserDto, user),
      token,
    };
  }

  getAuthenticatedUser(user: User): UserDto {
    return plainToClass(UserDto, user);
  }
}
