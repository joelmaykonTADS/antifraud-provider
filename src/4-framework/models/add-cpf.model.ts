import * as mongoose from 'mongoose';

export const CpfSchema = new mongoose.Schema({
  value: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

export interface Cpf extends mongoose.Document {
  id: string;
  value: string;
  createdAt: Date;
}
