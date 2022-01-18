import { NestFactory } from '@nestjs/core';
import { AppModule } from './4-framework/infrastructure/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
