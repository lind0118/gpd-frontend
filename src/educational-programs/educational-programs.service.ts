import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEducationalProgramDto } from '../models/EducationalPrograms/create-educational-program.dto';
import { UpdateEducationalProgramDto } from '../models/EducationalPrograms/update-educational-program.dto';
import { PrismaService } from 'src/prisma.service';
import { EducationalPrograms, Prisma } from '@prisma/client';
import { promises } from 'dns';

@Injectable()
export class EducationalProgramsService {
  constructor(private prisma: PrismaService) {}

/**
 * Method for creating a new educational program.
 * @param data Program data to register
 * @returns Registered Educational Program
 */
async createProgram(educationalProgram: CreateEducationalProgramDto): Promise <{ message: string | null; error: { message: string } | null; data: EducationalPrograms | null }> {
  try {
  await this.validateAreaId(educationalProgram);
  const newPartialTemplate = await this.prisma.educationalPrograms.create({
    data: {
      ...educationalProgram,
    },
  });

  return { message: 'Registrado con éxito', error: null, data: newPartialTemplate};
} catch (error) {
  return { message: 'No se pudo registrar el programa educativo', error: error.message , data: null };
  }
 }

  /**
   * Method to consult all programs
   * @returns Returns all registered educational programs
   */
  async findAllPrograms(): Promise<any> {
    try {
      const programs = await this.prisma.educationalPrograms.findMany();
      
      if (programs.length === 0) {
        return { message: 'Sin programas educativos', error: null, data: null };
      }
      
     
      return { message: 'Programas educativos encontrados', error: null, data: programs };
    } catch (error) {
      return { message: 'Error al cargar programas educativos', error: error.message, data: null };
    } 
  }


   /**
   * Method to find an educational program by its id.
   * @param id ID of the program to find
   * @returns Educational program
   * @throws NotFoundException if program is not found
   */
   async findProgramById(id: number): Promise<EducationalPrograms> {
    const educationalProgram = await this.prisma.educationalPrograms.findUnique({
      where: { id },
    });

    if (!educationalProgram) {
      throw new NotFoundException(`Programa educativo con ID ${id} no encontrado`);
    }

    return educationalProgram;
  }

  /**
   * Method to update a program using its id
   * @param id id of the program to update
   * @param updateEducationalProgramDto Program data to update
   * @returns Returns the updated program
   */

  async updateProgram(
    id: number,
    updateEducationalProgramDto: UpdateEducationalProgramDto
  ): Promise<{ message: string | null; error: { message: string } | null; data: EducationalPrograms | null }> {
    try {
      await this.validateAreaId(updateEducationalProgramDto);
  
      await this.findProgramById(id);
  
      const updatedProgram = await this.prisma.educationalPrograms.update({
        data: { ...updateEducationalProgramDto },
        where: { id },
      });
  
      return { message: 'Actualización exitosa', error: null, data: updatedProgram };
    } catch (error) {
      return { message: 'Error al actualizar', error: { message: error.message }, data: null };
    }
  }
  
  
/**
 * *Method to delete a program
 * @param id id of the program to delete
 * @returns Return a message after deleting a program
 */

async removeProgram(id: number, confirmed: boolean): Promise<{ message: string }> {
 
  if (!confirmed) {
    return { message: 'Operación no confirmada por el usuario' };
  }

  
  await this.findProgramById(id);

  await this.prisma.educationalPrograms.delete({
    where: { id }
  });

  return { message: 'Eliminada Correctamente' };
}


/**
   * Validates if foreign keys (areaId, responsibleId, revisedById)
   * @param {CreateEducationalProgramDto | UpdateEducationalProgramDto} dto - Data to validate
   * @throws {NotFoundException} - If any foreign keys is not found
   */
private async validateAreaId(
  dto: CreateEducationalProgramDto | UpdateEducationalProgramDto,
): Promise<void> {
  const { areaId } = dto;
  const validations = [];

  if (areaId !== undefined) {
    if (typeof areaId !== 'number') {
      throw new Error(`Tipo de areaId inválido: se esperaba un número, se recibió ${typeof areaId}`);
    }
    validations.push(
      this.prisma.area.count({ where: { id: areaId } }).then((count) => {
        if (count === 0) {
          throw new NotFoundException(`Área con ID ${areaId} no existe`);
        }
      }),
    );
  }

  await Promise.all(validations);
}
}
