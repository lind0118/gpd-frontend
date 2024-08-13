import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { PrismaService } from 'src/prisma.service';
import { validateForeignKeys } from 'src/common/validation/custom-validation.pipe';

@Module({
  providers: [SubjectService, PrismaService, validateForeignKeys],
  controllers: [SubjectController],
})
export class SubjectModule {}
