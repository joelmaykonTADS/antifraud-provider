import { BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { NotFoundError } from 'rxjs';
import { Cpf } from 'src/4-framework/models/add-cpf.model';
import { InputCpfDto } from '../../../../src/2-business/dto/cpf/input-cpf.dto';
import { OutputCpfDto } from '../../../../src/2-business/dto/cpf/output-cpf.dto';
import { AddCPFUseCase } from '../../../../src/2-business/useCases/add-cpf.useCase';
import { CpfRepository } from '../../../../src/4-framework/repositories/cpf.repository';

describe('CPF UseCase', () => {
  let useCase: AddCPFUseCase;
  let repository: CpfRepository;
  let cpfModel: Model<Cpf>;

  beforeEach(async () => {
    repository = new CpfRepository(cpfModel);
    useCase = new AddCPFUseCase(repository);
  });

  test('Add CPF success', async () => {
    const date = new Date();
    const result = {
      value: '00954817029',
      createdAt: date,
    };
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    jest.spyOn(repository, 'save').mockResolvedValue({
      value: '00954817029',
      createdAt: date,
    } as OutputCpfDto);
    expect(
      await useCase.run({
        value: '009.548.170-29',
      } as InputCpfDto),
    ).toEqual(result);
  });

  test('Try add CPF, error cpf exist', async () => {
    const date = new Date();
    jest.spyOn(repository, 'findOne').mockResolvedValue({
      value: '00954817028',
      createdAt: date,
    } as OutputCpfDto);
    expect(
      await useCase.run({
        value: '009.548.170-28',
      } as InputCpfDto),
    ).toBeInstanceOf(BadRequestException);
  });

  test('Try add CPF error, repeat numbers', async () => {
    const date = new Date();
    jest.spyOn(repository, 'findOne').mockResolvedValue({
      value: '00954817029',
      createdAt: date,
    } as OutputCpfDto);
    expect(
      await useCase.run({
        value: '009.548.170-29',
      } as InputCpfDto),
    ).toBeInstanceOf(BadRequestException);
  });
});
