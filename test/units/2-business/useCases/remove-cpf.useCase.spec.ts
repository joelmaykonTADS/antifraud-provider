import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { ValidCPFUseCase } from '../../../../src/2-business/useCases/valid-cpf.useCase';
import { InputCpfDto } from '../../../../src/2-business/dto/cpf/input-cpf.dto';
import { RemoveCPFUseCase } from '../../../../src/2-business/useCases/remove-cpf.useCase';
import { CpfRepository } from '../../../../src/4-framework/repositories/cpf.repository';
import { Cpf } from '../../../../src/4-framework/models/cpf.model';

describe('CPF Remove UseCase', () => {
  let useCase: RemoveCPFUseCase;
  let repository: CpfRepository;
  let cpfModel: Model<Cpf>;
  let valid: ValidCPFUseCase;

  beforeEach(async () => {
    repository = new CpfRepository(cpfModel);
    valid = new ValidCPFUseCase();
    useCase = new RemoveCPFUseCase(repository, valid);
  });

  test('Remove CPF success', async () => {
    const date = new Date();
    jest.spyOn(repository, 'findOne').mockResolvedValue({
      value: '00954817029',
      createdAt: date,
    });
    jest.spyOn(repository, 'remove').mockResolvedValue(null);
    expect(
      await useCase.run({
        value: '009.548.170-29',
      } as InputCpfDto),
    ).toEqual(undefined);
  });

  test('Try remove CPF, error cpf not exist', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    expect(
      await useCase.run({
        value: '009.548.170-28',
      } as InputCpfDto),
    ).toBeInstanceOf(NotFoundException);
  });

  test('Try remove CPF error, repeat numbers', async () => {
    expect(
      await useCase.run({
        value: '111.111.111-11',
      } as InputCpfDto),
    ).toBeInstanceOf(BadRequestException);
  });
});
