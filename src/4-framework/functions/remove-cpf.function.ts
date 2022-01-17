// users.ts
import { Handler, Context } from 'aws-lambda';
import { proxy } from 'aws-serverless-express';
import { bootstrapServer } from '../infrastructure/server';
import { Module } from '@nestjs/common';
import { CpfRepository } from '../repositories/cpf.repository';
import { MongoModule } from '../infrastructure/mongoDB';
import { ValidCPFUseCase } from '../../2-business/useCases/valid-cpf.useCase';
import { MongooseModule } from '@nestjs/mongoose';
import { CpfSchema } from '../models/cpf.model';
import { RemoveCPFUseCase } from '../../2-business/useCases/remove-cpf.useCase';
import { RemoveCPFController } from '../../3-controller/remove-cpf.controller';

@Module({
  imports: [
    MongoModule,
    MongooseModule.forFeature([{ name: 'Cpf', schema: CpfSchema }]),
  ],
  controllers: [RemoveCPFController],
  providers: [
    RemoveCPFUseCase,
    ValidCPFUseCase,
    {
      useClass: CpfRepository,
      provide: 'ICpfRepository',
    },
  ],
})
export class RemoveCpfLambda {}

export const handler: Handler = async (event: any, context: Context) => {
  console.info('init function :: remove cpf');
  const cachedServer = await bootstrapServer(RemoveCpfLambda);
  console.info('finished functions :: remove cpf');
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
