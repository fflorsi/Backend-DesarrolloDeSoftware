//mascota tiene q tener nombre, edad, raza, sexo, peso
import crypto from 'node:crypto';
export class Pet {
  constructor(
    public name: string,
    public birthdate: Date,
    public type: number,
    public breed: string,
    public weight: number,
    public clientId: number,
    public id?: number,
  ) {}
}
