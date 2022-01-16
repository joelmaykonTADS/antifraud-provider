import { NestFactory } from '@nestjs/core';
import { AppModule } from './4-framework/infrastructure/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
