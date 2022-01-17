import { Inject, Injectable } from '@nestjs/common';
import { OutputCpfDto } from '../dto/cpf/output-cpf.dto';
import { ICpfRepository } from '../repositories/cpf.respository.interfaces';

@Injectable()
export class FindAllCPFUseCase {
  constructor(
    @Inject('ICpfRepository')
    private readonly _cpfRepository: ICpfRepository,
  ) {}

  async run(): Promise<OutputCpfDto[]> {
    try {
      return await this._cpfRepository.findAll();
    } catch (e) {
      console.error('error useCase find all cpfs');
      return e;
    }
  }
}
