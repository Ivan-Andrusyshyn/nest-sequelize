import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
  IsDefined,
  IsIn,
  IsEmail,
} from 'class-validator';
import { UserRole } from '../user-role.enum';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  @IsEmail()
  @MaxLength(50)
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly username: string;

  @IsDefined()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  readonly password: string;

  @IsOptional()
  @IsIn([UserRole.ADMIN, UserRole.USER])
  role: UserRole;
}
