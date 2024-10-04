import { IsString, IsOptional, IsIn } from 'class-validator';
import { UserRole } from '../user-role.enum';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  readonly username: string;

  @IsOptional()
  @IsIn([UserRole.ADMIN, UserRole.USER])
  role: UserRole;
}
