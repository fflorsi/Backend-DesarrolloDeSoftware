import crypto from 'node:crypto'

export class observation{
    constructor(
        public name: string,
        public dificultyLevel: number, 
        public materialsUsed: number,
        public description: string,
        public datePerformed: string,
        public id?: number,
     ) {}
}