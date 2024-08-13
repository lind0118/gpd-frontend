import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BigIntInterceptor } from './interceptors/bigint.interceptor';
import { CustomExceptionFilter } from './common/filters/custom-exception.filter';
import { CustomValidationPipe } from './common/validation/custom-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new BigIntInterceptor());
  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(3000);
}
bootstrap();
