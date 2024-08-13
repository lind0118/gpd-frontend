import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from 'src/models/subject/create-subject.dto';
import { UpdateSubjectDto } from 'src/models/subject/update-subject.dto';

@Controller('subject')
export class SubjectController {
    constructor(private readonly subjectService: SubjectService) { }
    /**
     * Handles the post request to create a new subject
     * @param createSubjectDto 
     * @returns 
     */
    @Post()
    create(@Body() createSubjectDto: CreateSubjectDto) {
        return this.subjectService.create(createSubjectDto);
    }
    /**
     * Handles the get request to get all subjects
     * @returns 
     */
    @Get()
    find(
        @Query('id', new ParseIntPipe({
            optional: true,
            exceptionFactory: () => {
                return new BadRequestException('El id no es un número');
            }
        })) id: number,
        @Query('programid', new ParseIntPipe({
            optional: true,
            exceptionFactory: () => {
                return new BadRequestException('El id del programa no es un número');
            }
        })) programId: number
    ) {
        if (id) return this.subjectService.findByProgram(id);
        if (programId) return this.subjectService.findByProgram(programId);
        return this.subjectService.findAll();
    }
    /**
     * Handles the patch request to update a subject
     * @param id 
     * @param updateSubjectDto 
     * @returns 
     */
    @Put(':id')
    update(@Param('id', new ParseIntPipe({
        exceptionFactory: () => {
            return new BadRequestException('El id no es un número');
        }
    })) id: number, @Body() updateSubjectDto: UpdateSubjectDto) {
        return this.subjectService.update(id, updateSubjectDto);
    }
    @Delete(':id')
    delete(@Param('id', new ParseIntPipe({
        exceptionFactory: () => {
            return new BadRequestException('El id no es un número');
        }
    })) id: number) {
        return this.subjectService.delete(id);
    }
}
