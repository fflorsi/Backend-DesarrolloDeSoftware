import request from 'supertest'
import { app } from '../app'

describe('Clients API', () => {
  let clientId: number

  // creación de cliente
  it('debe crear un cliente', async () => {
    const response = await request(app)
      .post('/api/clients')
      .send({
        dni: '12345678',
        firstname: 'Juan',
        lastname: 'Perez',
        address: 'Corrientes 501',
        phone: '341123456789',
        email: 'juanperez@gmail.com',
        birthDate: '1999-01-01',
      })

    expect(response.status).toBe(201)
    expect(response.body.message).toBe('Client created')
    expect(response.body.data).toHaveProperty('id')
    clientId = response.body.data.id
  })

  // obtener todos los clientes
  it('debe devolver todos los clientes', async () => {
    const response = await request(app).get('/api/clients')
    expect(response.status).toBe(200)
    expect(response.body.data).toBeInstanceOf(Array)
  })

  // obtener un cliente por ID
  it('debe devolver un cliente', async () => {
    const response = await request(app).get(`/api/clients/${clientId}`)
    expect(response.status).toBe(200)
    expect(response.body.data).toHaveProperty('id', clientId)
  })

  // actualizar un cliente
  it('debe actualizar un cliente', async () => {
    const response = await request(app)
      .put(`/api/clients/${clientId}`)
      .send({
        dni: '12345678',
        firstname: 'Juan Domingo',
        lastname: 'Perez',
        address: 'Corrientes 502',
        phone: '987654321',
        email: 'juanperez8@gmail.com',
        birthDate: '1998-01-01',
      })

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Client updated successfully')
    expect(response.body.data).toHaveProperty('id', clientId)
    expect(response.body.data).toHaveProperty('firstname', 'Juan Domingo')
  })

  // buscar cliente por DNI
  it('debe devolver un cliente y sus mascotas por DNI', async () => {
    const response = await request(app).get(`/api/clients/by-dni/12345678`)
    expect(response.status).toBe(200)
    expect(response.body.ownerData).toHaveProperty('id', clientId)
    expect(response.body.petData).toBeInstanceOf(Array)
  })

  // buscar clientes por string de búsqueda
  it('debe devolver clientes por búsqueda de DNI', async () => {
    const response = await request(app).get(`/api/clients/search/12345678`)
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
  })

  // eliminar un cliente
  it('debe eliminar un cliente', async () => {
    const response = await request(app).delete(`/api/clients/${clientId}`)
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Client deleted successfully')
  })

  // test para intentar obtener un cliente eliminado
  it('debe devolver 404 al intentar devolver un cliente eliminado', async () => {
    const response = await request(app).get(`/api/clients/${clientId}`)
    expect(response.status).toBe(404)
    expect(response.body.message).toBe('Client not found')
  })
})