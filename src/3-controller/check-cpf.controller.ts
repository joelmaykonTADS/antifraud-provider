import { Controller, Param, Get } from '@nestjs/common';
import { InputCpfDto } from '../2-business/dto/cpf/input-cpf.dto';
import { OutputCpfDto } from '../2-business/dto/cpf/output-cpf.dto';
import { CheckCPFUseCase } from '../2-business/useCases/check-cpf.useCase';

@Controller('cpf')
export class CheckCPFController {
  constructor(private readonly checkCpf: CheckCPFUseCase) {}

  @Get('/:cpf')
  async run(@Param('cpf') cpf: string): Promise<OutputCpfDto> {
    const input = new InputCpfDto();
    input.value = cpf;
    console.info(`init controller :: check cpf: ${cpf}`);
    const output = await this.checkCpf.run(input);
    console.info(`finished controller :: check cpf: ${JSON.stringify(output)}`);
    return output;
  }
}
