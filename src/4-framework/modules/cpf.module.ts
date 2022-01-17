import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddCPFUseCase } from 'src/2-business/useCases/add-cpf.useCase';
import { CheckCPFUseCase } from 'src/2-business/useCases/check-cpf.useCase';
import { ValidCPFUseCase } from 'src/2-business/useCases/valid-cpf.useCase';
import { AddCPFController } from 'src/3-controller/add-cpf.controller';
import { CheckCPFController } from 'src/3-controller/check-cpf.controller';
import { CpfSchema } from '../models/cpf.model';
import { CpfRepository } from '../repositories/cpf.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Cpf', schema: CpfSchema }])],
  controllers: [AddCPFController, CheckCPFController],
  providers: [
    AddCPFUseCase,
    CheckCPFUseCase,
    ValidCPFUseCase,
    {
      // You can switch useClass to different implementation
      useClass: CpfRepository,
      provide: 'ICpfRepository',
    },
  ],
})
export class CpfModule {}
