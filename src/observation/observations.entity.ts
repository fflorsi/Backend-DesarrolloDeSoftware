import crypto from 'node:crypto'

export class observation{
    constructor(
        public name: string,
        public professional: number,
        public description: string,
        public medicalhistoryId: number,
        public id?: number
     ) {}
}