// users.ts
import { Handler, Context } from 'aws-lambda';
import { proxy } from 'aws-serverless-express';
import { bootstrapServer } from '../infrastructure/server';
import { Module } from '@nestjs/common';
import { CpfRepository } from '../repositories/cpf.repository';
import { MongoModule } from '../infrastructure/mongoDB';
import { CheckCPFController } from '../../3-controller/check-cpf.controller';
import { CheckCPFUseCase } from '../../2-business/useCases/check-cpf.useCase';
import { ValidCPFUseCase } from '../../2-business/useCases/valid-cpf.useCase';
import { MongooseModule } from '@nestjs/mongoose';
import { CpfSchema } from '../models/cpf.model';

@Module({
  imports: [
    MongoModule,
    MongooseModule.forFeature([{ name: 'Cpf', schema: CpfSchema }]),
  ],
  controllers: [CheckCPFController],
  providers: [
    CheckCPFUseCase,
    ValidCPFUseCase,
    {
      useClass: CpfRepository,
      provide: 'ICpfRepository',
    },
  ],
})
export class CheckCpfLambda {}

export const handler: Handler = async (event: any, context: Context) => {
  console.info('init function :: check cpf');
  const cachedServer = await bootstrapServer(CheckCpfLambda);
  console.info('finished functions :: check cpf');
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
