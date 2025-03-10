import { Pet } from '../pet/pet.entity.js';
import { PetRepository } from '../pet/pet.repository.js';

describe('Pet Repository', () => {
    let repository: PetRepository
    let petId: number
    beforeEach(() => {
        repository = new PetRepository()
    })

    it('debería agregar una nueva mascota', async () => {
        const newPet = new Pet('Test Pet', new Date('2020-01-01'), 1, 'Test Breed', 10, 1)
        const result = await repository.add(newPet)
        if (result?.id !== undefined){
        expect(result).toHaveProperty('id')
        expect(result.name).toBe('Test Pet')
        petId = result.id}
      
    })

    it('debería encontrar todas las mascotas', async () => {
        const pets = await repository.findAll()
        expect(pets).toBeInstanceOf(Array)
    })

    it('debería encontrar una mascota por ID', async () => {
        const pet = await repository.findOne({ id: petId.toString() })
        expect(pet).toHaveProperty('id', petId)
    })

    it('debería actualizar una mascota', async () => {
        const updatedPet = new Pet('Updated Pet', new Date('2020-01-01'), 1, 'Updated Breed', 10, 1)
        const result = await repository.update(petId.toString(), updatedPet)
        expect(result).toHaveProperty('name', 'Updated Pet')
    })

    it('debería eliminar una mascota', async () => {
        const result = await repository.delete({ id: petId.toString()})
        expect(result).toHaveProperty('id', petId)
    })
})