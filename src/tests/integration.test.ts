import request from 'supertest';
import { app } from '../app'; // Asegúrate de que la ruta a tu app sea correcta

describe('API Integration Tests', () => {
  let clientId: number;
  let petId: number;
  let professionalId: number;
  let facilityId: number;
  let productId: number;

  // Test para crear un cliente
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

  // Test para crear una mascota
  it('debe crear una mascota', async () => {
    const response = await request(app)
      .post('/api/pets')
      .send({
        name: 'Test Pet',
        birthdate: new Date('2020-01-01'),
        type: 1,
        breed: 'Test Breed',
        weight: 10,
        client_id: clientId, 
      })

    expect(response.status).toBe(201)
    expect(response.body.message).toBe('Pet created')
    expect(response.body.data).toHaveProperty('id')
    petId = response.body.data.id
  })

  // Test para crear un profesional
  it('debe crear un profesional', async () => {
    const response = await request(app)
      .post('/api/professionals')
      .send({
        dni: '18293741',
        lastname: 'Lopez',
        firstname: 'Maria',
        address: 'Av. Libertador 1000',
        phone: 341987654321,
        email: 'marialopez@gmail.com',
        birthDate: '1985-05-05',
      })

    expect(response.status).toBe(201)
    expect(response.body.message).toBe('Professional created')
    expect(response.body.data.professional).toHaveProperty('id')
    professionalId = response.body.data.professional.id
  })

  // Test para crear un servicio
  it('debe crear un servicio', async () => {
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

  // Test para crear un producto
  it('debe crear un producto', async () => {
    const response = await request(app)
      .post('/api/products')
      .send({
        name: 'Test Product',
        description: 'This is a test product',
        price: 50.00,
        stock: 100,
        category: 'Test Category',
      })

    expect(response.status).toBe(201)
    expect(response.body.message).toBe('Product created')
    expect(response.body.data).toHaveProperty('id')
    productId = response.body.data.id
  })

  // Test para obtener todos los clientes
  it('debe devolver todos los clientes', async () => {
    const response = await request(app).get('/api/clients')
    expect(response.status).toBe(200)
    expect(response.body.data).toBeInstanceOf(Array)
  })

  // Test para obtener una mascota por ID
  it('debe devolver una mascota por ID', async () => {
    const response = await request(app).get(`/api/pets/${petId}`)
    expect(response.status).toBe(200)
    expect(response.body.data).toHaveProperty('id', petId)
  })

  // Test para actualizar un cliente
  it('debe actualizar un cliente', async () => {
    const response = await request(app)
      .put(`/api/clients/${clientId}`)
      .send({
        dni: '12345678',
        firstname: 'Juan Carlos',
        lastname: 'Perez',
        address: 'Corrientes 502',
        phone: '341123456789',
        email: 'juancarlosperez@gmail.com',
        birthDate: '1999-01-01',
      })

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Client updated successfully')
    expect(response.body.data).toHaveProperty('id', clientId)
  })

  // Test para eliminar una mascota
  it('debe eliminar una mascota', async () => {
    const response = await request(app).delete(`/api/pets/${petId}`)
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Pet deleted successfully')
  })

  // Test para intentar obtener una mascota eliminada
  it('debe devolver 404 al intentar devolver una mascota eliminada', async () => {
    const response = await request(app).get(`/api/pets/${petId}`)
    expect(response.status).toBe(404)
    expect(response.body.message).toBe('Pet not found')
  })

  // Test para eliminar un cliente
  it('debe eliminar un cliente', async () => {
    const response = await request(app).delete(`/api/clients/${clientId}`)
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Client deleted successfully')
  })

  //Test para eliminar un profesional
  it('debe eliminar un profesional', async () => {
    const response = await request(app).delete(`/api/professionals/${professionalId}`)
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Professional deleted successfully')
  })

  //Test para eliminar un servicio
  it('debe eliminar un servicio', async () => {
    const response = await request(app).delete(`/api/facilities/${facilityId}`)
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Facility deleted')
  })

  // Test para eliminar un producto
  it('debe eliminar un producto', async () => {
    const response = await request(app).delete(`/api/products/${productId}`)
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Product deleted successfully')
  })
})