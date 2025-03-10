import { Facility } from '../facility/facility.entity.js';
import { FacilityRepository } from '../facility/facility.repository.js';

describe('Facility Repository', () => {
    let repository: FacilityRepository
    let facilityId: number

    beforeEach(() => {
        repository = new FacilityRepository()
    })

    it('debería agregar una nueva facility', async () => {
        const newFacility = new Facility('Test Facility', 'Test Description', 100)
        const result = await repository.add(newFacility)
        if(result.id){
          facilityId = result.id
        }
        expect(result).toHaveProperty('id')
        expect(result.name).toBe('Test Facility')
    })

    it('debería encontrar todas las facilities', async () => {
        const facilities = await repository.findAll()
        expect(facilities).toBeInstanceOf(Array)
    })

    it('debería encontrar una facility por ID', async () => {
        const facility = await repository.findOne({ id: facilityId.toString() })
        expect(facility).toHaveProperty('id', facilityId)
    })

    it('debería actualizar una facility', async () => {
        const updatedFacility = new Facility('Updated Facility', 'Updated Description', 150)
        const result = await repository.update(facilityId.toString(), updatedFacility)
        expect(result).toHaveProperty('name', 'Updated Facility')
    })

    it('debería eliminar una facility', async () => {
        const result = await repository.delete({ id: facilityId.toString() })
        expect(result).toHaveProperty('id', facilityId)
    })
})