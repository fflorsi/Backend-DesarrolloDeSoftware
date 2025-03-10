export class Professional{
    constructor(
        public dni: string,
        public lastname: string,
        public firstname: string,
        public address: string, 
        public phone: string,
        public email: string,
        public birthDate: Date,
        public id?: number,
     ) {}
}