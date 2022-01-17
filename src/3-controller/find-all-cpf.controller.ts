import { Controller, Get } from '@nestjs/common';
import { FindAllCPFUseCase } from '../2-business/useCases/find-all-cpf.useCase';
import { OutputCpfDto } from '../2-business/dto/cpf/output-cpf.dto';

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
