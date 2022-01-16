import { Module } from '@nestjs/common';
import { CpfModule } from '../modules/cpf.module';
import { MongoModule } from './mongoDB';

@Module({
  imports: [CpfModule, MongoModule],
})
export class AppModule {}
