import { Inject, Injectable } from '@nestjs/common';
import { InputCpfDto } from '../dto/cpf/input-cpf.dto';
import { OutputCpfDto } from '../dto/cpf/output-cpf.dto';
import { ICpfRepository } from '../repositories/cpf.respository.interfaces';

@Injectable()
export class AddCPFUseCase {
  constructor(
    @Inject('ICpfRepository')
    private readonly _cpfRepository: ICpfRepository,
  ) {}

  async run(input: InputCpfDto): Promise<OutputCpfDto> {
    const cpf = new OutputCpfDto();
    cpf.value = input.value;
    return this._cpfRepository.save(cpf);
  }
}
