import crypto from 'node:crypto';
export class Client {
    constructor(dni, firstname, lastname, address, phone, email, registrationDate, id = crypto.randomUUID()) {
        this.dni = dni;
        this.firstname = firstname;
        this.lastname = lastname;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.registrationDate = registrationDate;
        this.id = id;
    }
}
//# sourceMappingURL=client.entity.js.map