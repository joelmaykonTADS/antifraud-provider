import { BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { ValidCPFUseCase } from '../../../../src/2-business/useCases/valid-cpf.useCase';
import { InputCpfDto } from '../../../../src/2-business/dto/cpf/input-cpf.dto';
import { OutputCpfDto } from '../../../../src/2-business/dto/cpf/output-cpf.dto';
import { AddCPFUseCase } from '../../../../src/2-business/useCases/add-cpf.useCase';
import { CpfRepository } from '../../../../src/4-framework/repositories/cpf.repository';
import { Cpf } from '../../../../src/4-framework/models/cpf.model';

describe('CPF Add UseCase', () => {
  let useCase: AddCPFUseCase;
  let repository: CpfRepository;
  let cpfModel: Model<Cpf>;
  let valid: ValidCPFUseCase;

  beforeEach(async () => {
    repository = new CpfRepository(cpfModel);
    valid = new ValidCPFUseCase();
    useCase = new AddCPFUseCase(repository, valid);
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
      value: '11111111111',
      createdAt: date,
    } as OutputCpfDto);
    expect(
      await useCase.run({
        value: '111.111.111-11',
      } as InputCpfDto),
    ).toBeInstanceOf(BadRequestException);
  });

  test('Try add CPF error, numbers invalid of digits', async () => {
    expect(
      await useCase.run({
        value: '111.111.111-1',
      } as InputCpfDto),
    ).toBeInstanceOf(BadRequestException);
  });
});
