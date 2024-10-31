import { Client as ClientModel } from './client.model.js'; // Importar modelo Sequelize
import { Client, Client as ClientInterface } from './client.entity.js'; // Importar la interfaz

export class ClientRepository {
  
  // Obtener todos los clientes
  public async findAll(): Promise<ClientInterface[]> {
    const clients = await ClientModel.findAll();
    return clients.map(client => client.toJSON() as ClientInterface); // Convertir a JSON
  }

  // Obtener un cliente por ID
  public async findOne(item: { id: string }): Promise<ClientInterface | null> {
    const id = Number.parseInt(item.id);
    if (isNaN(id)) return null; // Cambiar undefined por null
    const client = await ClientModel.findByPk(id);
    return client ? (client.toJSON() as ClientInterface) : null; // Manejo de null
  }

  // Añadir un cliente
  public async add(clientInput: ClientInterface): Promise<ClientInterface> {
    const newClient = await ClientModel.create(clientInput);
    return newClient.toJSON() as ClientInterface; // Convertir a JSON
  }

  // Actualizar un cliente
  public async update(id: string, clientInput: ClientInterface): Promise<ClientInterface | null> {
    const clientId = Number.parseInt(id);

    if (isNaN(clientId)) return null;

    try {
        // Perform the update
        const [rowsUpdated] = await ClientModel.update(clientInput, {
            where: { id: clientId },
        });

        console.log(`Rows updated: ${rowsUpdated}`);

        // If no rows were updated, return null
        if (rowsUpdated === 0) return null;

        // Fetch the updated instance
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
    if (!clientToDelete) return null; // Cambiar undefined por null
    await ClientModel.destroy({ where: { id: clientToDelete.id } });
    return clientToDelete; // Devuelve el cliente eliminado
  }

  // Obtener un cliente y sus mascotas por DNI
  public async findClientAndPetsByDni(dni: string): Promise<ClientInterface | null> {
    const client = await ClientModel.findOne({ 
      where: { dni }, 
      include: ['pets'] // Asegúrate de que esta relación esté definida en tu modelo
    });
    return client ? (client.toJSON() as ClientInterface) : null; // Manejo de null
  }
}
