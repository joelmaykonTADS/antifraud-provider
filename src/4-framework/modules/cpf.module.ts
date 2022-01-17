import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddCPFUseCase } from 'src/2-business/useCases/add-cpf.useCase';
import { AddCPFController } from 'src/3-controller/add-cpf.controller';
import { CpfSchema } from '../models/add-cpf.model';
import { CpfRepository } from '../repositories/cpf.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Cpf', schema: CpfSchema }])],
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
export class CpfModule {}
