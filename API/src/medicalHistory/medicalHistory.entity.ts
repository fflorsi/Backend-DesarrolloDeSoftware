import crypto from 'node:crypto' 

export class MedicalHistory{
  constructor(
    public petId:number,
    public observations:string[],
    public vaccines:number[],
    public id?: number
  ) {}
}