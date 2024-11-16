import crypto from 'node:crypto' 
import { observation } from '../observation/observations.entity';
import { QueryResult } from 'mysql2';
export class MedicalHistory{
  constructor(
    public petId:number,
    public id?: number
  ) {}
}