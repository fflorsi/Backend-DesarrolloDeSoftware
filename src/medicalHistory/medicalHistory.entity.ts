import crypto from 'node:crypto' 
import { observation } from '../observation/observations.entity';
import { QueryResult } from 'mysql2';
export class MedicalHistory{
  constructor(
    public petId:number,
    public vaccines: any[], //Cuando esté el crud de vaccines, actualizo el tipo
    public observations: any[],
    public id?: number
  ) {}
}