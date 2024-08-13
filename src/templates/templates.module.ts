import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TemplatesService } from './templates.service';
import { TemplatesController } from './templates.controller';

@Module({
  controllers: [TemplatesController],
  providers: [TemplatesService, PrismaService],
})
export class TemplatesModule {}
