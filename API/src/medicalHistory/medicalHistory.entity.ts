import { RowDataPacket } from 'mysql2';
import crypto from 'node:crypto' 

export class MedicalHistory{
  constructor(
    public petId:number,
    public vaccines:RowDataPacket[], //En un futuro se importa la clase Pet y se asigna dicho tipo de dato
    public id?: number
  ) {}
}
