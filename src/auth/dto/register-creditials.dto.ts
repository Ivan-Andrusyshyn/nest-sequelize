import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
  IsOptional,
  IsDefined,
  IsIn,
} from 'class-validator';
import { UserRole } from 'src/user/user-role.enum';

export class RegisterCredentialsDto {
  @IsEmail()
  @IsDefined()
  @IsString()
  @MaxLength(24, { message: 'Your email is too long!' })
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
