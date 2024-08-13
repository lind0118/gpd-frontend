import { Module } from '@nestjs/common';
import { EducationalProgramsService } from './educational-programs.service';
import { EducationalProgramsController } from './educational-programs.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [EducationalProgramsController],
  providers: [EducationalProgramsService, PrismaService],
})
export class EducationalProgramsModule {}
