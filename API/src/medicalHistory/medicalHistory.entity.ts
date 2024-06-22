import crypto from 'node:crypto' 

export class MedicalHistory{
  constructor(
    public petId:number,
    public vaccines:number[],
    public id?: number
  ) {}
}