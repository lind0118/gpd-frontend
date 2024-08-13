import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class UpdateTemplateDto {
  @IsOptional()
  @IsString({ message: 'El campo estado tiene que ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo estado no puede estar vacio' })
  state?: string;

  @IsOptional()
  @IsInt({ message: "El campo 'área' tiene que ser un numero entero" })
  @IsNotEmpty({ message: "El campo 'área' no puede estar vacio" })
  @Min(1, {
    message: "El campo 'área' tiene que ser un número entero positivo",
  })
  areaId?: number;

  @IsOptional()
  @IsString({ message: 'El campo periodo tiene que ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo periodo no puede estar vacio' })
  period?: string;

  @IsOptional()
  @IsInt({ message: "El campo 'responsable' tiene que ser un numero entero" })
  @IsNotEmpty({ message: "El campo 'responsable' id no puede estar vacio" })
  @Min(1, {
    message:
      "El campo 'responsable' id tiene que ser un número entero positivo",
  })
  responsibleId?: number;

  @IsOptional()
  @IsInt({ message: "El campo 'revisado por' tiene que ser un numero entero" })
  @IsNotEmpty({ message: "El campo 'revisado por' no puede estar vacio" })
  @Min(1, {
    message: "El campo 'revisado por' tiene que ser un número entero positivo",
  })
  revisedById?: number;
}
