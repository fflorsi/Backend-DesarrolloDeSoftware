import { Client } from '../client/client.entity.js';
import { ClientRepository } from '../client/client.repository.js';

describe('Client Repository', () => {
    let repository: ClientRepository
    let clientId : number
    beforeEach(() => {
        repository = new ClientRepository()
    })

    it('debería agregar un nuevo cliente', async () => {
        const newClient = new Client('73820194', 'Juan', 'Perez', 'Corrientes 501', '341123456789', 'juanperez@gmail.com', new Date('1999-01-01'))
        const result = await repository.add(newClient)
        if(result.id){
        clientId = result.id
      }
        expect(result).toHaveProperty('id')
        expect(result.firstname).toBe('Juan')
    })

    it('debería encontrar todos los clientes', async () => {
        const clients = await repository.findAll()
        expect(clients).toBeInstanceOf(Array)
    })

    it('debería encontrar un cliente por ID', async () => {
        const client = await repository.findOne({ id: clientId.toString() })
        expect(client).toHaveProperty('id', clientId)
    })

    it('debería actualizar un cliente', async () => {
        const updatedClient = new Client('83920311', 'Juan Carlos', 'Perez', 'Corrientes 502', '341123456789', 'juancarlosperez@gmail.com', new Date('1999-01-01'))
        const result = await repository.update(clientId.toString(), updatedClient)
        expect(result).toHaveProperty('firstname', 'Juan Carlos')
    })

    it('debería eliminar un cliente', async () => {
        const result = await repository.delete({ id: clientId.toString() })
        expect(result).toHaveProperty('id', clientId)
    })
})