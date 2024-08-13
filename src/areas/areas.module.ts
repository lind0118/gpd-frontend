import { Module } from '@nestjs/common';
import { AreasService } from './areas.service';
import { PrismaService } from 'src/prisma.service';
import { AreasController } from './areas.controller';

@Module({
  controllers: [AreasController],
  providers: [AreasService, PrismaService],
})
export class AreasModule {}
