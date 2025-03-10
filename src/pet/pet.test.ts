/*import request from 'supertest'
import { app } from '../app'

describe('Pets API', () => {
  let petId: number


  // creación de pet
  it('debe crear una mascota', async () => {
    const response = await request(app)
      .post('/api/pets')
      .send({
        name: 'Test Pet',
        birthdate: new Date('2020-01-01'),
        type: 1,
        breed: 'Test Breed',
        weight: 10,
        client_id: 1
      })

    expect(response.status).toBe(201)
    expect(response.body.message).toBe('Pet created')
    expect(response.body.data).toHaveProperty('id')
    petId = response.body.data.id
  })

  // get all
  it('debe devolver todas las mascotas', async () => {
    const response = await request(app).get('/api/pets')
    expect(response.status).toBe(200)
    expect(response.body.data).toBeInstanceOf(Array)
  })

  // get one
  it('debe devolver una mascota', async () => {
    const response = await request(app).get(`/api/pets/${petId}`)
    expect(response.status).toBe(200)
    expect(response.body.data).toHaveProperty('id', petId)
  })

  // update
  it('debe actualizar una mascota', async () => {
    const response = await request(app)
      .put(`/api/pets/${petId}`)
      .send({
        name: 'Test Pet 2',
        birthdate: new Date('2020-01-01'),
        type: 1,
        breed: 'Breed 2',
        weight: 15,
        client_id: 1
      })

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Pet updated successfully')
    expect(response.body.data).toHaveProperty('id', petId)
    expect(response.body.data).toHaveProperty('name', 'Test Pet 2')
  })

  // búsqueda por clientId
  it('debe buscar mascotas por clientId', async () => {
    const responseSearch = await request(app).get('/api/pets/by-client/1')
    expect(responseSearch.status).toBe(200)
    expect(responseSearch.body.data).toBeInstanceOf(Array)
    expect(responseSearch.body.data.length).toBeGreaterThan(0)
  })

  // búsqueda sin resultados
  it('debe devolver un array vacío al buscar por un clientId que no existe', async () => {
    const responseSearch = await request(app).get('/api/pets/by-client/999999') // Un clientId que no existe
    expect(responseSearch.status).toBe(404)
    expect(responseSearch.body.message).toBe('Pets not found for the given client')
  })

  // delete
  it('debe eliminar una mascota', async () => {
    const response = await request(app).delete(`/api/pets/${petId}`)
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Pet deleted successfully')
  })

  // test para intentar obtener una mascota eliminada
  it('debe devolver 404 al intentar devolver una mascota eliminada', async () => {
    const response = await request(app).get(`/api/pets/${petId}`)
    expect(response.status).toBe(404)
    expect(response.body.message).toBe('Pet not found')
  })
})*/