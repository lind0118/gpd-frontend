import { Template } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTemplateDto } from 'src/models/template/create-template.dto';
import { UpdateTemplateDto } from 'src/models/template/update-template.dto';

@Injectable()
export class TemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Registers a new template.
   * @param {CreateTemplateDto} createTemplateDto - The template data to register.
   * @returns {Promise<{ message: string; error: string | null; data: Template | null }>} - The registered template.
   */
  async create(createTemplateDto: CreateTemplateDto): Promise<any> {
    try {
      await this.validateAreaId(createTemplateDto);
      await this.validateResponsibleId(createTemplateDto);
      await this.validateRevisedById(createTemplateDto);

      const template = await this.prisma.template.create({
        data: {
          ...createTemplateDto,
        },
      });
      return {
        message: 'Plantilla registrada',
        error: null,
        data: template,
      };
    } catch (error) {
      return {
        message: 'Error al registrar la plantilla',
        error: error.message,
        data: null,
      };
    }
  }

  /**
   * Lists all templates.
   * @returns {Promise<{ message: string; error: string | null; data: Template[] | null }>} - All registered templates.
   */
  async findAll(): Promise<any> {
    // return await this.prisma.personalData.findMany();
    try {
      const templates = await this.prisma.template.findMany();
      if (templates.length === 0) {
        return {
          message: 'No se encontraron plantillas',
          error: null,
          data: [],
        };
      }

      return {
        message: 'Plantillas obtenidas con exito',
        error: null,
        data: templates,
      };
    } catch (error) {
      return {
        message: 'Error al obtener las plantillas',
        error: error.message,
        data: null,
      };
    }
  }

  /**
   * Gets a template by its ID.
   * @param {number} id - The ID of the template to search for.
   * @returns {Promise<{ message: string; error: string | null; data: Template | null }>} - The template based on the given ID.
   */
  async findOne(id: number): Promise<any> {
    try {
      if (id) {
        await this.validateId(id);
        const template = await this.prisma.template.findMany({
          where: {
            id,
          },
        });

        if (template.length === 0) {
          return {
            message: 'Aún no existen plantillas para este área',
            error: null,
            data: template,
          };
        }
        return {
          message: 'Plantillas obtenidas con éxito',
          error: null,
          data: template,
        };
      }
    } catch (error) {
      return {
        message: 'Error al obtener la plantilla',
        error: error.message,
        data: null,
      };
    }
  }

  /**
   * Updates a template by its ID.
   * @param {number} id - The ID of the template to update.
   * @param {UpdateTemplateDto} updateTemplateDto - The template data to update.
   * @returns {Promise<{ message: string; error: string | null; data: Template | null }>} - The updated template.
   */
  async update(id: number, updateTemplateDto: UpdateTemplateDto): Promise<any> {
    try {
      await this.validateId(id);
      await this.validateAreaId(updateTemplateDto);
      await this.validateResponsibleId(updateTemplateDto);
      await this.validateRevisedById(updateTemplateDto);

      const template = await this.validateId(id);
      const currentPeriods = [
        TemplatesService.currentPeriod(true),
        TemplatesService.currentPeriod(false),
      ];

      if (!currentPeriods.includes(template.period)) {
        return {
          message: null,
          error: 'Esta plantilla no se puede actualizar',
          data: null,
        };
      }

      const updatedTemplate = await this.prisma.template.update({
        where: {
          id,
        },
        data: {
          ...updateTemplateDto,
        },
      });

      return {
        message: 'Plantilla actualizada',
        error: null,
        data: updatedTemplate,
      };
    } catch (error) {
      return {
        message: 'Error al actualizar la plantilla',
        error: error.message,
        data: null,
      };
    }
  }

  /**
   * Deletes a template by its ID.
   * @param {number} id - The ID of the template to delete.
   * @returns {Promise<{ message: string; error: string | null; data: null }>} - The result of the deletion.
   */
  async remove(id: number): Promise<any> {
    try {
      await this.validateId(id);
      await this.prisma.template.delete({
        where: {
          id,
        },
      });
      return {
        message: 'Se eliminó la plantilla',
        error: null,
        data: null,
      };
    } catch (error) {
      return {
        message: 'Error al eliminar la plantilla',
        error: error.message,
        data: null,
      };
    }
  }

  /**
   * Gets the current period based on the current month and year.
   * @param {boolean} ord - Indicates whether the period is Ordinary (true) or Extraordinary (false).
   * @returns {string} - The period string for the current period.
   */
  private static currentPeriod(ord: boolean): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const ordinary = ord ? 'Ordinario' : 'Extraordinario';

    if (month <= 4) {
      return `enero - abril ${year}: ${ordinary}`;
    } else if (month <= 8) {
      return `mayo - agosto ${year}: ${ordinary}`;
    } else {
      return `septiembre - diciembre ${year}: ${ordinary}`;
    }
  }

  /**
   * Validates if a template ID exists.
   * @param {number} id - The ID of the template to validate.
   * @returns {Promise<Template>} - The template with the given ID.
   * @throws {NotFoundException} - If the template ID is not found.
   */
  private async validateId(id: number): Promise<Template> {
    const template = await this.prisma.template.findUnique({
      where: {
        id,
      },
    });

    if (!template) {
      throw new NotFoundException('Plantilla no encontrada');
    }
    return template;
  }

  /**
   * Validates if the area ID exists.
   * @param {CreateTemplateDto | UpdateTemplateDto} dto - The DTO containing the area ID.
   * @returns {Promise<void>} - Resolves if the area ID is valid.
   * @throws {NotFoundException} - If the area ID is not found.
   */
  private async validateAreaId(
    dto: CreateTemplateDto | UpdateTemplateDto,
  ): Promise<void> {
    const { areaId } = dto;
    if (areaId !== undefined) {
      const area = await this.prisma.area.findUnique({ where: { id: areaId } });
      if (!area) {
        throw new NotFoundException(`Área con ID ${areaId} no encontrada`);
      }
    }
  }

  /**
   * Validates if the responsible user ID exists.
   * @param {CreateTemplateDto | UpdateTemplateDto} dto - The DTO containing the responsible user ID.
   * @returns {Promise<void>} - Resolves if the responsible user ID is valid.
   * @throws {NotFoundException} - If the responsible user ID is not found.
   */
  private async validateResponsibleId(
    dto: CreateTemplateDto | UpdateTemplateDto,
  ): Promise<void> {
    const { responsibleId } = dto;
    if (responsibleId !== undefined) {
      const user = await this.prisma.users.findUnique({
        where: { nt: responsibleId },
      });
      if (!user) {
        throw new NotFoundException(
          `Usuario con NT ${responsibleId} no encontrado`,
        );
      }
    }
  }

  /**
   * Validates if the revised by user ID exists.
   * @param {CreateTemplateDto | UpdateTemplateDto} dto - The DTO containing the revised by user ID.
   * @returns {Promise<void>} - Resolves if the revised by user ID is valid.
   * @throws {NotFoundException} - If the revised by user ID is not found.
   */
  private async validateRevisedById(
    dto: CreateTemplateDto | UpdateTemplateDto,
  ): Promise<void> {
    const { revisedById } = dto;
    if (revisedById !== undefined) {
      const user = await this.prisma.users.findUnique({
        where: { nt: revisedById },
      });
      if (!user) {
        throw new NotFoundException(
          `Usuario con NT ${revisedById} no encontrado`,
        );
      }
    }
  }
}
