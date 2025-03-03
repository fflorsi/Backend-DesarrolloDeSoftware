import request from 'supertest'
import { app } from '../app'

describe('Observations API', () => {
  let observationId: number

  // creación de observacion
  it('debe crear una observación', async () => {
    const response = await request(app)
      .post('/api/observation')
      .send({
        name: 'Test Observation',
        professional: 1,
        description: 'This is a test observation',
        medicalHistoryId: 1,
      })

    expect(response.status).toBe(201)
    expect(response.body.message).toBe('Observation created')
    expect(response.body.data).toHaveProperty('id')
    observationId = response.body.data.id
  })

  // getall
  it('debe devolver todas las observaciones', async () => {
    const response = await request(app).get('/api/observation')
    expect(response.status).toBe(200)
    expect(response.body.data).toBeInstanceOf(Array)
  })

  // getone
  it('debe devolver una observación', async () => {
    const response = await request(app).get(`/api/observation/${observationId}`)
    expect(response.status).toBe(200)
    expect(response.body.data).toHaveProperty('id', observationId)
  })

  // update
  it('debe actualizar una observación', async () => {
    const response = await request(app)
      .put(`/api/observation/${observationId}`)
      .send({
        name: 'Updated Test Observation',
        professional: 1,
        description: 'This is an updated test observation',
        medicalHistoryId: 1,
      })

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Observation updated successfully')
    expect(response.body.data).toHaveProperty('id', observationId)
    expect(response.body.data).toHaveProperty('name', 'Updated Test Observation')
  })

  // get observation by medicalhistoryid
  it('debe devolver observaciones por historial médico', async () => {
    const medicalHistoryId = 1
    const response = await request(app).get(`/api/observation/byMedicalHistory/${medicalHistoryId}`)
    expect(response.status).toBe(200)
    expect(response.body.data).toBeInstanceOf(Array)
})

  // delete
  it('debe eliminar una observación', async () => {
    const response = await request(app).delete(`/api/observation/${observationId}`)
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Observation deleted succesfully')
  })

  // test para intentar obtener una observación eliminada
  it('Debe devolver 404 al intentar devolver una observación eliminada', async () => {
    const response = await request(app).get(`/api/observation/${observationId}`)
    expect(response.status).toBe(404)
    expect(response.body.message).toBe('Observation not found')
  })
})