import { InputCpfDto } from '../dto/cpf/input-cpf.dto';
import { OutputCpfDto } from '../dto/cpf/output-cpf.dto';

export interface ICpfRepository {
  save(cpf: InputCpfDto): Promise<OutputCpfDto>;
}
