import { Controller, Get } from '@nestjs/common';
import { InputCpfDto } from '../2-business/dto/cpf/input-cpf.dto';
import { FindAllCPFUseCase } from 'src/2-business/useCases/find-all-cpf.useCase';
import { OutputCpfDto } from 'src/2-business/dto/cpf/output-cpf.dto';

@Controller('cpf')
export class FindAllCPFController {
  constructor(private readonly findAllCpf: FindAllCPFUseCase) {}

  @Get()
  async run(): Promise<OutputCpfDto[]> {
    console.info(`init controller :: find all cpfs`);
    const cpfs = await this.findAllCpf.run();
    console.info(`finished controller :: find all cpfs`);
    return cpfs;
  }
}
