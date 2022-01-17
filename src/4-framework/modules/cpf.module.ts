import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddCPFUseCase } from 'src/2-business/useCases/add-cpf.useCase';
import { CheckCPFUseCase } from 'src/2-business/useCases/check-cpf.useCase';
import { FindAllCPFUseCase } from 'src/2-business/useCases/find-all-cpf.useCase';
import { RemoveCPFUseCase } from 'src/2-business/useCases/remove-cpf.useCase';
import { ValidCPFUseCase } from 'src/2-business/useCases/valid-cpf.useCase';
import { AddCPFController } from 'src/3-controller/add-cpf.controller';
import { CheckCPFController } from 'src/3-controller/check-cpf.controller';
import { FindAllCPFController } from 'src/3-controller/find-all-cpf.controller';
import { RemoveCPFController } from 'src/3-controller/remove-cpf.controller';
import { CpfSchema } from '../models/cpf.model';
import { CpfRepository } from '../repositories/cpf.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Cpf', schema: CpfSchema }])],
  controllers: [
    AddCPFController,
    CheckCPFController,
    RemoveCPFController,
    FindAllCPFController,
  ],
  providers: [
    AddCPFUseCase,
    CheckCPFUseCase,
    RemoveCPFUseCase,
    FindAllCPFUseCase,
    ValidCPFUseCase,
    {
      // You can switch useClass to different implementation
      useClass: CpfRepository,
      provide: 'ICpfRepository',
    },
  ],
})
export class CpfModule {}
