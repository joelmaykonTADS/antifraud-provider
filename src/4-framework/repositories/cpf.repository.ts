import { Injectable } from '@nestjs/common';
import { InputCpfDto } from 'src/2-business/dto/cpf/input-cpf.dto';
import { OutputCpfDto } from 'src/2-business/dto/cpf/output-cpf.dto';
import { ICpfRepository } from 'src/2-business/repositories/cpf.respository.interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cpf } from '../models/cpf.model';

@Injectable()
export class CpfRepository implements ICpfRepository {
  constructor(@InjectModel('Cpf') private readonly cpfModel: Model<Cpf>) {}

  async findAll(): Promise<OutputCpfDto[]> {
    return this.cpfModel.find();
  }

  async remove(cpf: InputCpfDto): Promise<void> {
    await this.cpfModel
      .deleteOne({
        value: cpf.value,
      })
      .exec();
  }

  public async findOne(cpf: InputCpfDto): Promise<OutputCpfDto> {
    return await this.cpfModel
      .findOne({
        value: cpf.value,
      })
      .exec();
  }

  public async save(cpf: InputCpfDto): Promise<OutputCpfDto> {
    const date = new Date();
    const addCpf = new this.cpfModel({
      value: cpf.value,
      createdAt: date.toISOString(),
    });
    return addCpf.save();
  }
}
