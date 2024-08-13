import { IsInt, IsNotEmpty, IsString, Min, min } from "class-validator";

export class CreateEducationalProgramDto {
    @IsString({ message: 'La abreviatura debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La abreviatura es obligatoria' })
    abbreviation: string

    @IsString({ message: 'La descripción debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La descripción es obligatoria' })
    description: string

    @IsInt({ message: 'El ID del área debe ser un numero ' })
    @IsNotEmpty({ message: 'El ID del área es obligatorio' })
    @Min(1,{message:"El Id del area debe ser un dato válido"})
    areaId: number
}

