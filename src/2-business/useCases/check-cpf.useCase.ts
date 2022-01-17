import { Inject, Injectable } from '@nestjs/common';
import { InputCpfDto } from '../dto/cpf/input-cpf.dto';
import { OutputCpfDto } from '../dto/cpf/output-cpf.dto';
import { ICpfRepository } from '../repositories/cpf.respository.interfaces';
import { ValidCPFUseCase } from './valid-cpf.useCase';

@Injectable()
export class CheckCPFUseCase {
  constructor(
    @Inject('ICpfRepository')
    private readonly _cpfRepository: ICpfRepository,
    private readonly _validCpf: ValidCPFUseCase,
  ) {}

  async run(input: InputCpfDto): Promise<OutputCpfDto> {
    const cpf = new OutputCpfDto();
    try {
      cpf.value = this._validCpf.formatted(input);
      this._validCpf.isRepeatedNumber(cpf);
      this._validCpf.isNotQuantityDigits(cpf);
      const result = await this._cpfRepository.findOne(cpf);
      this._validCpf.isNotExist(result);
      return result;
    } catch (e) {
      console.error('error useCase check cpf');
      return e;
    }
  }
}
