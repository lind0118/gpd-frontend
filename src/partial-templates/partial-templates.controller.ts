import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { PartialTemplatesService } from './partial-templates.service';
import { CreatePartialTemplateDto } from 'src/models/partialTemplate/create-partial-template.dto';
import { UpdatePartialTemplateDto } from 'src/models/partialTemplate/update-partial-template.dto';

@Controller('partial-templates')
export class PartialTemplatesController {
  constructor(
    private readonly partialTemplatesService: PartialTemplatesService,
  ) {}

  /**
   * Creates a new partialTemplate
   * @param {CreatePartialTemplateDto} createPartialTemplateDto The partialTemplate data transfer object
   * @returns - The created partialTemplate
   */
  @Post()
  create(@Body() createPartialTemplateDto: CreatePartialTemplateDto){
    return this.partialTemplatesService.create({ ...createPartialTemplateDto});
  }

  /**
   * Retrieves partialTemplates
   * @returns An array of partialTemplates by status
  */
  @Get()
  async findAll(@Query('status') status?: string) {
    return this.partialTemplatesService.findAll(status);
  }

  /** Retrieves a partialTemplate by ID
   * @param {number} id - The ID of the partialTemplate to retrieve
   * @returns - The partialTemplate with the specified ID
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.partialTemplatesService.findOne(id);
  }

  /**
   * Updates a partialTemplate by ID
   * @param {number} id - The ID of the partialTemplate to update
   * @param {UpdatePartialTemplateDto} updatePartialTemplateDto - The updated partialTemplate data traansfer object
   * @returns - The updated partialTemplate
   */
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePartialTemplateDto: UpdatePartialTemplateDto,
  ) {
    return this.partialTemplatesService.update(id, updatePartialTemplateDto);
  }

  /** Deletes a partialTemplate by ID
   * @param {number} id - The ID of the partialTemplate to delete
   * @returns - The deleted partialTemplate
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.partialTemplatesService.remove(id);
  }
}
