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
import { FindAllCPFController } from '../../3-controller/find-all-cpf.controller';
import { FindAllCPFUseCase } from '../../2-business/useCases/find-all-cpf.useCase';

@Module({
  imports: [
    MongoModule,
    MongooseModule.forFeature([{ name: 'Cpf', schema: CpfSchema }]),
  ],
  controllers: [FindAllCPFController],
  providers: [
    FindAllCPFUseCase,
    ValidCPFUseCase,
    {
      useClass: CpfRepository,
      provide: 'ICpfRepository',
    },
  ],
})
export class FindAllCpfLambda {}

export const handler: Handler = async (event: any, context: Context) => {
  console.info('init function :: check cpf');
  const cachedServer = await bootstrapServer(FindAllCpfLambda);
  console.info('finished functions :: check cpf');
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
