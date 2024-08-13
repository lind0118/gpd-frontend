import { IsNotEmpty, IsString } from 'class-validator';
export class CreateAreaDto {
  @IsString({ message: 'El campo nombre tiene que ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo nombre no puede estar vacío' })
  name: string;
}
