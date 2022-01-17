import { Controller, Param, Delete } from '@nestjs/common';
import { RemoveCPFUseCase } from '../2-business/useCases/remove-cpf.useCase';
import { InputCpfDto } from '../2-business/dto/cpf/input-cpf.dto';

@Controller('cpf')
export class RemoveCPFController {
  constructor(private readonly removeCpf: RemoveCPFUseCase) {}

  @Delete('/:cpf')
  async run(@Param('cpf') cpf: string): Promise<void> {
    const input = new InputCpfDto();
    input.value = cpf;
    console.info(`init controller :: remove cpf: ${cpf}`);
    await this.removeCpf.run(input);
    console.info(`finished controller :: remove cpf`);
  }
}
