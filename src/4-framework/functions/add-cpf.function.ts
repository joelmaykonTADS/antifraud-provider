// users.ts
import { Handler, Context } from 'aws-lambda';
import { proxy } from 'aws-serverless-express';
import { bootstrapServer } from '../infrastructure/server';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddCPFController } from '../../3-controller/add-cpf.controller';
import { AddCPFUseCase } from '../../2-business/useCases/add-cpf.useCase';
import { CpfRepository } from '../repositories/cpf.repository';
import { CpfSchema } from '../models/add-cpf.model';
import { MongoModule } from '../infrastructure/mongoDB';

@Module({
  imports: [
    MongoModule,
    MongooseModule.forFeature([{ name: 'Cpf', schema: CpfSchema }]),
  ],
  controllers: [AddCPFController],
  providers: [
    AddCPFUseCase,
    {
      // You can switch useClass to different implementation
      useClass: CpfRepository,
      provide: 'ICpfRepository',
    },
  ],
})
export class AddCpfLambda {}

export const handler: Handler = async (event: any, context: Context) => {
  console.info('init function :: add cpf');
  const cachedServer = await bootstrapServer(AddCpfLambda);
  console.info('finished functions :: add cpf');
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
