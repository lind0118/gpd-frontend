import { Module } from '@nestjs/common';
import { PartialTemplatesService } from './partial-templates.service';
import { PartialTemplatesController } from './partial-templates.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PartialTemplatesController],
  providers: [PartialTemplatesService, PrismaService],
})
export class PartialTemplatesModule {}
