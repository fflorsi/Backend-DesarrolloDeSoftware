/*import request from 'supertest'
import { app } from '../app'

describe('Facilities API', () => {
  let facilityId: number

  // creación de facility
  it('debe crear una facility', async () => {
    const response = await request(app)
      .post('/api/facilities')
      .send({
        name: 'Test Facility',
        description: 'This is a test facility',
        price: 100.00,
      })

    expect(response.status).toBe(201)
    expect(response.body.message).toBe('Facility created')
    expect(response.body.data).toHaveProperty('id')
    facilityId = response.body.data.id
  })

  // get all
  it('debe devolver todas las facilities', async () => {
    const response = await request(app).get('/api/facilities')
    expect(response.status).toBe(200)
    expect(response.body.data).toBeInstanceOf(Array)
  })

  // get one
  it('debe devolver una facility', async () => {
    const response = await request(app).get(`/api/facilities/${facilityId}`)
    expect(response.status).toBe(200)
    expect(response.body.data).toHaveProperty('id', facilityId)
  })

  // update
  it('debe actualizar una facility', async () => {
    const response = await request(app)
      .put(`/api/facilities/${facilityId}`)
      .send({
        name: 'Updated Test Facility',
        description: 'This is an updated test facility',
        price: 150.00,
      })

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Facility updated')
    expect(response.body.data).toHaveProperty('id', facilityId)
    expect(response.body.data).toHaveProperty('name', 'Updated Test Facility')
  })

  // búsqueda por nombre
  it('debe buscar facilities por nombre', async () => {
    const responseSearch = await request(app).get('/api/facilities/search?name=Test')
    expect(responseSearch.status).toBe(200)
    expect(responseSearch.body.data).toBeInstanceOf(Array)
    expect(responseSearch.body.data.length).toBeGreaterThan(0)
  })

  // búsqueda sin resultados
  it('debe devolver un array vacío al buscar por un nombre que no existe', async () => {
    const responseSearch = await request(app).get('/api/facilities/search?name=NonExistentFacility')
    expect(responseSearch.status).toBe(200)
    expect(responseSearch.body.data).toBeInstanceOf(Array)
    expect(responseSearch.body.data.length).toBe(0)
  })


  // delete
  it('debe eliminar una facility', async () => {
    const response = await request(app).delete(`/api/facilities/${facilityId}`)
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Facility deleted')
  })

  // test para intentar obtener una facility eliminada
  it('Debe devolver 404 al intentar devolver una facility eliminada', async () => {
    const response = await request(app).get(`/api/facilities/${facilityId}`)
    expect(response.status).toBe(404)
    expect(response.body.message).toBe('Facility not found')
  })
})*/