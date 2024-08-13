import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { TemplatesModule } from './templates/templates.module';
import { EducationalProgramsModule } from './educational-programs/educational-programs.module';
import { SubjectModule } from './subject/subject.module';
import { PartialTemplatesModule } from './partial-templates/partial-templates.module';
import { AreasModule } from './areas/areas.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    EducationalProgramsModule,
    TemplatesModule,
    PartialTemplatesModule,
    SubjectModule,
    AreasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
