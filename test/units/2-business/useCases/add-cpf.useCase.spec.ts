import { Model } from 'mongoose';
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
      value: '123',
      createdAt: date,
    };
    jest.spyOn(repository, 'save').mockResolvedValue({
      value: '123',
      createdAt: date,
    } as OutputCpfDto);
    expect(
      await useCase.run({
        value: '123',
      } as InputCpfDto),
    ).toEqual(result);
  });
});
