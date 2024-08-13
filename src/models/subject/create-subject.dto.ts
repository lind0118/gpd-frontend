import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateSubjectDto {
  @IsInt({ message: 'El programa educativo debe ser un número entero' })
  @Min(1, { message: 'El programa educativo debe ser un entero positivo' })
  educationalProgramId: number;
  @IsInt({ message: 'Las horas semanales deben ser un número entero' })
  @Min(1, { message: 'Las horas semanales deben ser un entero positivo' })
  weeklyHours: number;
  @IsInt({ message: 'El total de horas debe ser un número entero' })
  @Min(1, { message: 'El total de horas debe ser un entero positivo' })
  totalHours: number;
  @IsNotEmpty({ message: 'El periodo no puede estar vacío' })
  @IsString({ message: 'El periodo debe ser un texto' })
  monthPeriod: string;
  @IsNotEmpty({ message: 'El nombre de la materia no puede estar vacío' })
  @IsString({ message: 'El nombre de la materia debe ser un texto' })
  subjectName: string;
}