import { Controller, Param, Post } from '@nestjs/common';
import { InputCpfDto } from '../2-business/dto/cpf/input-cpf.dto';
import { OutputCpfDto } from '../2-business/dto/cpf/output-cpf.dto';
import { AddCPFUseCase } from '../2-business/useCases/add-cpf.useCase';

@Controller('cpf')
export class AddCPFController {
  constructor(private readonly addCpf: AddCPFUseCase) {}

  @Post('/:cpf')
  async run(@Param('cpf') cpf: string): Promise<OutputCpfDto> {
    const input = new InputCpfDto();
    input.value = cpf;
    console.info(`init controller :: add cpf: ${cpf}`);
    const output = await this.addCpf.run(input);
    console.info(`finished controller :: add cpf: ${JSON.stringify(output)}`);
    return output;
  }
}
