import { PartialType } from '@nestjs/mapped-types';
import { CreatePartialTemplateDto } from './create-partial-template.dto';
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePartialTemplateDto extends PartialType(CreatePartialTemplateDto) {
  @IsString({ message: 'El campo nombre tiene que ser una cadena de texto'})
  @IsNotEmpty({message: 'El campo nombre no puede estar vacío'})
  name: string;

  @IsString({ message: 'El campo genero tiene que ser una cadena de texto'})
  @IsOptional()
  gender?: string;

  @IsString({ message: 'El campo posición tiene que ser una cadena de texto'})
  @IsNotEmpty({message: 'El campo posición no puede estar vacío'})
  position: string;

  @IsInt({ message: 'El campo total debe ser un número entero'})
  @IsNotEmpty({message: 'El campo total no puede estar vacío'})
  total: number;

  @IsString({ message: 'El campo estado tiene que ser una cadena de texto'})
  @IsNotEmpty({message: 'El campo estado no puede estar vacío'})
  @IsIn(['aprobado', 'pendiente', 'corrección'], { message: 'Error al actualizar el estado' })
  status: string;

  @IsString({ message: 'El campo año tiene que ser una cadena de texto'})
  @IsNotEmpty({message: 'El campo año no puede estar vacío'}) 
  year: string;

  @IsString({ message: 'El campo periodo tiene que ser una cadena de texto'})
  @IsNotEmpty({message: 'El campo periodo no puede estar vacío'})
  period: string;

  @IsInt({ message: 'El campo ID Plantilla debe ser un número entero'})
  @IsNotEmpty({message: 'El campo ID Plantilla no puede estar vacío'})
  templateId: number;
}
