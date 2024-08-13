import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  Controller,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { AreasService } from './areas.service';
import { CreateAreaDto } from 'src/models/area/create-area.dto';
import { UpdateAreaDto } from 'src/models/area/update-area.dto';

@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  /**
   * Creates a new area.
   * @param createAreaDto - Data Transfer Object for creating a new area.
   * @returns The created area.
   */
  @Post()
  create(@Body() createAreaDto: CreateAreaDto) {
    return this.areasService.create(createAreaDto);
  }

  /**
   * Retrieves an area by ID or name, or all areas if no query parameters are provided.
   * @param id - The ID of the area to retrieve (optional).
   * @param name - The name of the area to retrieve (optional).
   * @returns The found area(s).
   */
  @Get()
  async find(
    @Query(
      'id',
      new ParseIntPipe({
        optional: true,
        exceptionFactory: () => {
          return new BadRequestException('El ID debe ser un número');
        },
      }),
    )
    id?: number,
    @Query('name') name?: string,
  ) {
    if (id) return this.areasService.findOneById(id);
    if (name) return this.areasService.findOneByName(name);
    return this.areasService.findAll();
  }

  /**
   * Updates an area by its ID.
   * @param id - The ID of the area to update.
   * @param updateAreaDto - Data Transfer Object for updating an area.
   * @returns The updated area.
   */
  @Patch(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: () => {
          return new BadRequestException('El ID debe ser un número');
        },
      }),
    )
    id: number,
    @Body() updateAreaDto: UpdateAreaDto,
  ) {
    return this.areasService.update(id, updateAreaDto);
  }

  /**
   * Deletes an area by its ID.
   * @param id - The ID of the area to delete.
   * @returns The deleted area.
   */
  @Delete(':id')
  remove(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: () => {
          return new BadRequestException('El ID debe ser un número');
        },
      }),
    )
    id: number,
  ) {
    return this.areasService.remove(id);
  }
}
