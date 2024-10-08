import { LoginCredentialsDto } from './dto/login-creditials.dto';
import { RegisterCredentialsDto } from './dto/register-creditials.dto';
import { UserDto } from './../user/dto/user.dto';
import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  UseGuards,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard, AuthUser } from 'src/common';
import { User } from 'src/models/user.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) registerCredentialsDto: RegisterCredentialsDto,
  ): Promise<{ user: UserDto; token: string }> {
    return this.authService.signUp(registerCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) loginCredentialsDto: LoginCredentialsDto,
  ): Promise<{ token: string }> {
    return this.authService.signIn(loginCredentialsDto);
  }

  @Post('/authenticated')
  @UseGuards(AuthGuard)
  getAuthenticatedUser(@AuthUser() user: User): UserDto {
    return this.authService.getAuthenticatedUser(user);
  }
}
