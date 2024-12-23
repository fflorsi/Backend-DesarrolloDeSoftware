import { Client as ClientModel } from './client.model.js'; 
import { Client, Client as ClientInterface } from './client.entity.js'; 
import { Op, Sequelize } from 'sequelize';

export class ClientRepository {
  
  // Obtener todos los clientes
  public async findAll(): Promise<ClientInterface[]> {
    const clients = await ClientModel.findAll();
    return clients.map(client => client.toJSON() as ClientInterface); 
  }

  // Obtener un cliente por ID
  public async findOne(item: { id: string }): Promise<ClientInterface | null> {
    const id = Number.parseInt(item.id);
    if (isNaN(id)) return null; 
    const client = await ClientModel.findByPk(id);
    return client ? (client.toJSON() as ClientInterface) : null; 
  }

  // Añadir un cliente
  public async add(clientInput: ClientInterface): Promise<ClientInterface> {
    const newClient = await ClientModel.create(clientInput);
    return newClient.toJSON() as ClientInterface; 
  }

  // Actualizar un cliente
  public async update(id: string, clientInput: ClientInterface): Promise<ClientInterface | null> {
    const clientId = Number.parseInt(id);

    if (isNaN(clientId)) return null;

    try {
        
        const [rowsUpdated] = await ClientModel.update(clientInput, {
            where: { id: clientId },
        });

        console.log(`Rows updated: ${rowsUpdated}`);

       
        if (rowsUpdated === 0) return null;

        
        const updatedClient = await ClientModel.findByPk(clientId);
        if (!updatedClient) return null;

        return updatedClient.toJSON() as ClientInterface;
    } catch (error) {
        console.error('Error during update:', error);
        return null;
    }
}

  // Borrar un cliente
  public async delete(item: { id: string }): Promise<ClientInterface | null> {
    const clientToDelete = await this.findOne(item);
    if (!clientToDelete) return null; 
    await ClientModel.destroy({ where: { id: clientToDelete.id } });
    return clientToDelete; // Devuelve el cliente eliminado
  }

  // Obtener un cliente y sus mascotas por DNI
  public async findClientAndPetsByDni(dni: string): Promise<ClientInterface | null> {
    const client = await ClientModel.findOne({ 
      where: { dni }, 
      include: ['pets'] 
    });
    return client ? (client.toJSON() as ClientInterface) : null; // Manejo de null
  }

  public async searchClientsByDNS(searchString: string): Promise<ClientInterface[] | null> {
    if (!searchString || searchString.trim() === '') {
        console.log('El término de búsqueda no puede estar vacío');
        return null;
    }

    try {
        const clients = await ClientModel.findAll({
            where: {
                [Op.or]: [
                    { dni: { [Op.like]: `%${searchString}%` } },
                    { firstname: { [Op.like]: `%${searchString}%` } },
                    { lastname: { [Op.like]: `%${searchString}%` } }
                ]
            }
        });

        if (clients.length === 0) {
            return null;  
        }

        return clients.map(client => client.toJSON() as ClientInterface);  

    } catch (error) {
        console.error('Error al buscar clientes:', error);
        return null;  
    }
}
}
