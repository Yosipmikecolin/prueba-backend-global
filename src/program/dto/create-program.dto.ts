import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsDateString,
  IsOptional,
  IsIn,
} from 'class-validator';

export class CreateProgramDto {
  @IsNotEmpty({ message: 'El nombre del programa no puede estar vacío.' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @MaxLength(100, { message: 'El nombre no puede exceder los 100 caracteres.' })
  name: string;

  @IsNotEmpty({ message: 'La descripción del programa no puede estar vacía.' })
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  description: string;

  @IsNotEmpty({ message: 'La fecha de inicio es requerida.' })
  @IsDateString(
    {},
    {
      message:
        'La fecha de inicio debe ser una cadena de fecha válida (ej. YYYY-MM-DD).',
    },
  )
  startDate: string;

  @IsOptional()
  @IsString({ message: 'El estado debe ser una cadena de texto.' })
  @IsIn(['active', 'suspended', 'finished'], {
    message: 'El estado debe ser "active", "suspended" o "finished".',
  })
  status?: string;
}
