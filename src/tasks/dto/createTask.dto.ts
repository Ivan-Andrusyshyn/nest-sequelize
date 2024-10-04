import {
  IsString,
  IsEmail,
  IsInt,
  Min,
  Max,
  Length,
  IsDate,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsUrl,
  MinLength,
  MaxLength,
} from 'class-validator';

export class TasksDto {
  @IsString()
  @MinLength(4)
  @MaxLength(24)
  readonly title: string;
  @IsString()
  @MinLength(4)
  @MaxLength(44)
  readonly description: string;
  readonly status: string;
}
