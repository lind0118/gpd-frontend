import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Subject } from '@prisma/client';
import { validateForeignKeys } from 'src/common/validation/custom-validation.pipe';
import { CreateSubjectDto } from 'src/models/subject/create-subject.dto';
import { UpdateSubjectDto } from 'src/models/subject/update-subject.dto';
import { PrismaService } from 'src/prisma.service';
/**
 * Interface to define the methods of the subjects service
 */
interface SubjectResult {
  create(
    createSubjectDto: CreateSubjectDto,
  ): Promise<{ message: string; data: void | Subject; error: string | null }>;
  findByProgram(
    id: number,
  ): Promise<{ message: string; data: Subject[] | null; error: string | null }>;
  findOne(
    id: number,
  ): Promise<{ message: string; data: Subject | null; error: null | string }>;
  findAll(): Promise<{
    message: string;
    data: Subject[];
    error: null | string;
  }>;
  update(
    id: number,
    updateSubjectDto: UpdateSubjectDto,
  ): Promise<{ message: string; data: Subject; error: null | string }>;
}

@Injectable()
export class SubjectService implements SubjectResult {
  constructor(
    private readonly prisma: PrismaService,
    private readonly foreign: validateForeignKeys,
  ) {}
  /**
   * Creates a new subject
   * @param createSubjectDto data to create a new subject
   * @returns object with the new subject, a message and an error if ocurred
   */
  async create(createSubjectDto: CreateSubjectDto) {
    this.foreign.add(
      this.prisma.educationalPrograms.count({
        where: { id: createSubjectDto.educationalProgramId },
      }),
    );
    if (await this.foreign.validate())
      throw new BadRequestException('El programa educativo no existe');
    try {
      const subject = await this.prisma.subject.create({
        data: createSubjectDto,
      });
      return {
        data: subject,
        error: null,
        message: 'Registrado!',
      };
    } catch (error) {
      return {
        data: null,
        error: 'Error de registro',
        message: 'Error al registrar la materia',
      };
    }
  }
  /**
   * Returns all subjects of an educational program
   * @param id the id of the educational program
   * @returns object with the subjects, a message and an error if ocurred
   */
  async findByProgram(id: number) {
    try {
      const subjects = await this.prisma.subject.findMany({
        where: {
          educationalProgramId: id,
        },
        orderBy: [{ monthPeriod: 'asc' }, { subjectName: 'asc' }],
      });
      const message =
        subjects.length === 0
          ? 'No se encontraron materias'
          : 'Materias econtradas';
      return {
        message,
        data: subjects,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: 'Error al buscar materias',
        message: 'Error al buscar las materias en el sistema',
      };
    }
  }
  /**
   * Returns a subject by its id
   * @param id id of the subject
   * @returns object with the subject, a message and an error if ocurred
   */
  async findOne(id: number) {
    try {
      const subject = await this.prisma.subject.findFirst({
        where: { id },
      });
      const message = subject ? 'Materia econtrada' : 'Materia no econtrada';
      return {
        data: subject,
        error: null,
        message,
      };
    } catch (error) {
      return {
        data: null,
        error: 'Error de búsqueda',
        message: 'Error al buscar la materia',
      };
    }
  }
  /**
   * Returns all subjects
   * @returns object with all subjects, a message and an error if ocurred
   */
  async findAll() {
    try {
      const subjects = await this.prisma.subject.findMany({
        orderBy: [
          { educationalProgramId: 'asc' },
          { monthPeriod: 'asc' },
          { subjectName: 'asc' },
        ],
      });
      const message =
        subjects.length === 0
          ? 'No se encontraron materias'
          : 'Todas las materias de todas las carreras';
      return {
        data: subjects,
        message,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: 'Error de búsqueda',
        message: 'Error al obtener las materias',
      };
    }
  }
  /**
   * Updates a subject by its id
   * @param id id of the subject
   * @param updateSubjectDto data to update the subject
   * @returns object with the updated subject, a message and an error if ocurred
   */
  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    try {
      this.foreign.add(this.prisma.subject.count({ where: { id } }));
      if (await this.foreign.validate())
        throw new NotFoundException('La materia no existe');
      const updated = await this.prisma.subject.update({
        where: {
          id,
        },
        data: updateSubjectDto,
      });
      return {
        data: updated,
        message: 'Actualizado!',
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: 'Error de actualización',
        message: 'Error al actualizar el registro',
      };
    }
  }
  /**
   * Deletes a subject by its id
   * @param id id of the subject
   * @returns a message and an error if ocurred
   */
  async delete(id: number) {
    try {
      this.foreign.add(this.prisma.subject.count({ where: { id } }));
      if (await this.foreign.validate())
        throw new NotFoundException('La materia no existe');
      await this.prisma.subject.delete({
        where: {
          id,
        },
      });
      return {
        data: null,
        error: null,
        message: 'Eliminado!',
      };
    } catch (error) {
      return {
        data: null,
        error: 'Error de eliminación',
        message: 'Error al eliminar el registro',
      };
    }
  }
}
