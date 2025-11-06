import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsIn,
  IsUUID,
  IsOptional,
  IsArray,
} from 'class-validator';
import { UserRole } from '../entities/user-role.enum';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre completo no puede estar vacío.' })
  @IsString({ message: 'El nombre completo debe ser una cadena de texto.' })
  @MaxLength(20, {
    message: 'El nombre completo no puede tener más de 20 caracteres.',
  })
  fullName: string;

  @IsNotEmpty({ message: 'El email no puede estar vacío.' })
  @IsEmail({}, { message: 'El formato del email no es válido.' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  password: string;

  @IsOptional()
  @IsIn([UserRole.STUDENT, UserRole.ADMIN], {
    message: 'El rol debe ser "estudiante" o "administrador".',
  })
  role?: UserRole = UserRole.STUDENT;

  @IsArray()
  @IsUUID('4', { each: true })
  programIds: string[];
}
