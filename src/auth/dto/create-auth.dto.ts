import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty({ message: 'La email no puede estar vacío.' })
  @IsString()
  email: string;
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
  @IsString()
  password: string;
}
