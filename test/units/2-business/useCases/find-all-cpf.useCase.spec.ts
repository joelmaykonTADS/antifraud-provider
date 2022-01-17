import { Model } from 'mongoose';
import { FindAllCPFUseCase } from '../../../../src/2-business/useCases/find-all-cpf.useCase';
import { CpfRepository } from '../../../../src/4-framework/repositories/cpf.repository';
import { Cpf } from '../../../../src/4-framework/models/cpf.model';

describe('CPF Find All UseCase', () => {
  let useCase: FindAllCPFUseCase;
  let repository: CpfRepository;
  let cpfModel: Model<Cpf>;

  beforeEach(async () => {
    repository = new CpfRepository(cpfModel);
    useCase = new FindAllCPFUseCase(repository);
  });

  test('Find All CPF success', async () => {
    const date = new Date();
    jest.spyOn(repository, 'findAll').mockResolvedValue([
      {
        value: '00954817029',
        createdAt: date,
      },
    ]);
    expect(await useCase.run()).toEqual([
      {
        value: '00954817029',
        createdAt: date,
      },
    ]);
  });
});
