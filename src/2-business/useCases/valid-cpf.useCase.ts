import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InputCpfDto } from '../dto/cpf/input-cpf.dto';

@Injectable()
export class ValidCPFUseCase {
  isNotQuantityDigits(cpf: InputCpfDto): void {
    const regex = /\b[\d]{11}\b/;
    if (!regex.test(this.formatted(cpf))) {
      throw new BadRequestException({
        type: 'InvalidCpfException',
        message: 'CPF has incorrect number of numbers, must be eleven digits',
      });
    }
  }

  formatted(cpf: InputCpfDto): string {
    return cpf.value.replace(/\D+/g, '');
  }

  isExist(cpf: InputCpfDto): void {
    if (cpf) {
      console.info(`not found cpf find one :: ${JSON.stringify(cpf)}`);
      throw new BadRequestException({
        type: 'ExistCpfException',
        message: "CPF exist and can't use this numbers.",
      });
    }
  }

  isNotExist(cpf: InputCpfDto): void {
    if (!cpf) {
      console.info(`not found cpf find one :: ${JSON.stringify(cpf)}`);
      throw new NotFoundException({
        type: '"NotFoundCpfException".',
        message: 'CPF not exist.',
      });
    }
  }

  isRepeatedNumber(cpf: InputCpfDto): void {
    const regex = /\b(\d)\1{10}\b/;
    if (regex.test(cpf.value)) {
      throw new BadRequestException({
        type: 'InvalidCpfException',
        message: 'CPF is not valid.',
      });
    }
  }
}
