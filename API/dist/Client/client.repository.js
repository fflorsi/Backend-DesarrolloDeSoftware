import { Client } from './client.entity.js';
const clients = [
    new Client('44523096', 'Facundo', 'Munne', 'Buenos Aires 1430', '3416470473', 'fnmunne@gmail.com', '2002/12/08', 'a02b91bc-3769-4221-beb1-d7a3aeba7dad'),
];
export class ClientRepository {
    findAll() {
        return clients;
    }
    findOne(item) {
        return clients.find((character) => character.id === item.id);
    }
    add(item) {
        clients.push(item);
        return item;
    }
    update(item) {
        const clientIdx = clients.findIndex((client) => client.id === item.id);
        if (clientIdx !== -1) {
            clients[clientIdx] = { ...clients[clientIdx], ...item };
        }
        return clients[clientIdx];
    }
    delete(item) {
        const clientIdx = clients.findIndex((client) => client.id === item.id);
        if (clientIdx !== -1) {
            const deletedClients = clients[clientIdx];
            clients.splice(clientIdx, 1);
            return deletedClients;
        }
    }
}
//# sourceMappingURL=client.repository.js.map