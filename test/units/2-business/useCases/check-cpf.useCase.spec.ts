import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { ValidCPFUseCase } from '../../../../src/2-business/useCases/valid-cpf.useCase';
import { InputCpfDto } from '../../../../src/2-business/dto/cpf/input-cpf.dto';
import { CheckCPFUseCase } from '../../../../src/2-business/useCases/check-cpf.useCase';
import { CpfRepository } from '../../../../src/4-framework/repositories/cpf.repository';
import { Cpf } from '../../../../src/4-framework/models/cpf.model';

describe('CPF Check UseCase', () => {
  let useCase: CheckCPFUseCase;
  let repository: CpfRepository;
  let cpfModel: Model<Cpf>;
  let valid: ValidCPFUseCase;

  beforeEach(async () => {
    repository = new CpfRepository(cpfModel);
    valid = new ValidCPFUseCase();
    useCase = new CheckCPFUseCase(repository, valid);
  });

  test('Check CPF success', async () => {
    const date = new Date();
    const result = {
      value: '00954817029',
      createdAt: date,
    };
    jest.spyOn(repository, 'findOne').mockResolvedValue({
      value: '00954817029',
      createdAt: date,
    });
    expect(
      await useCase.run({
        value: '009.548.170-29',
      } as InputCpfDto),
    ).toEqual(result);
  });

  test('Try check CPF, error cpf not exist', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    expect(
      await useCase.run({
        value: '009.548.170-28',
      } as InputCpfDto),
    ).toBeInstanceOf(NotFoundException);
  });

  test('Try check CPF error, repeat numbers', async () => {
    expect(
      await useCase.run({
        value: '111.111.111-11',
      } as InputCpfDto),
    ).toBeInstanceOf(BadRequestException);
  });
});
