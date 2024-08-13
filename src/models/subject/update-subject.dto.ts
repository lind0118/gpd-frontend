import { PartialType } from '@nestjs/mapped-types';
import { CreateSubjectDto } from './create-subject.dto';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class UpdateSubjectDto extends PartialType(CreateSubjectDto) {
  @IsOptional()
  @IsInt({ message: 'El programa educativo debe ser un número entero' })
  @Min(1, { message: 'El programa educativo debe ser un entero positivo' })
  educationalProgramId: number;
  @IsOptional()
  @IsInt({ message: 'Las horas semanales deben ser un número entero' })
  @Min(1, { message: 'Las horas semanales deben ser un entero positivo' })
  weeklyHours: number;
  @IsOptional()
  @IsInt({ message: 'El total de horas debe ser un número entero' })
  @Min(1, { message: 'El total de horas debe ser un entero positivo' })
  totalHours: number;
  @IsOptional()
  @IsNotEmpty({ message: 'El periodo no puede estar vacío' })
  @IsString({ message: 'El periodo debe ser un texto' })
  monthPeriod: string;
  @IsOptional()
  @IsNotEmpty({ message: 'El nombre de la materia no puede estar vacío' })
  @IsString({ message: 'El nombre de la materia debe ser un texto' })
  subjectName: string;
}
