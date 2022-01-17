import { BadRequestException, Inject, Injectable } from '@nestjs/common';
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
    try {
      cpf.value = this.formatted(input);
      await this.isExist(cpf);
      this.isRepeatedNumber(cpf);
      this.isNotQuantityElevenDigits(cpf);
      const createdCpf = this._cpfRepository.save(cpf);
      return createdCpf;
    } catch (e) {
      console.log('error useCase add cpf');
      return e;
    }
  }

  private isRepeatedNumber(cpf: InputCpfDto): void {
    const regex = /\b(\d)\1{10}\b/;
    if (regex.test(cpf.value)) {
      throw new BadRequestException({
        type: 'InvalidCpfException',
        message: 'CPF is not valid.',
      });
    }
  }

  private isNotQuantityElevenDigits(cpf: InputCpfDto): void {
    const regex = /\b[\d]{11}\b/;
    if (!regex.test(this.formatted(cpf))) {
      throw new BadRequestException({
        type: 'InvalidCpfException',
        message: 'CPF is more than eleven digits.',
      });
    }
  }

  private formatted(cpf: InputCpfDto): string {
    return cpf.value.replace(/\D+/g, '');
  }

  private async isExist(cpf: InputCpfDto): Promise<void> {
    const result = await this._cpfRepository.findOne(cpf);
    if (result) {
      console.info(`Result cpf find one :: ${JSON.stringify(cpf)}`);
      throw new BadRequestException({
        type: 'ExistCpfException',
        message: "CPF exist and can't use this numbers.",
      });
    }
  }
}
