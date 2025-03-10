import { observation } from '../observation/observations.entity.js';
import { observationRepository } from '../observation/observation.repository.js';

describe('Observation Repository', () => {
    let repository: observationRepository
    let observationId: number
    beforeEach(() => {
        repository = new observationRepository()
    })

    it('debería agregar una nueva observación', async () => {
        const newObservation = new observation('Test Observation', 1, 'Test Description', 1)
        const result = await repository.add(newObservation)
        if(result.id){
        observationId = result.id
      }
        expect(result).toHaveProperty('id')
        expect(result.name).toBe('Test Observation')
    })

    it('debería encontrar todas las observaciones', async () => {
        const observations = await repository.findAll()
        expect(observations).toBeInstanceOf(Array)
    })

    it('debería encontrar una observación por ID', async () => {
        const observation = await repository.findOne({ id: observationId.toString() })
        expect(observation).toHaveProperty('id', observationId)
    })

    it('debería actualizar una observación', async () => {
        const updatedObservation = new observation('Updated Observation', 1, 'Updated Description', 1)
        const result = await repository.update(observationId.toString(), updatedObservation)
        expect(result).toHaveProperty('name', 'Updated Observation')
    })

    it('debería eliminar una observación', async () => {
        const result = await repository.delete({ id: observationId.toString() })
        expect(result).toHaveProperty('id', observationId)
    })
});