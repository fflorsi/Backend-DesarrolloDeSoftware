import { Professional } from '../professional/professionals.entity.js';
import { ProfessionalRepository } from '../professional/professional.repository.js';

describe('Professional Repository', () => {
    let repository: ProfessionalRepository
    let professionalId: number

    beforeEach(() => {
        repository = new ProfessionalRepository()
    })

    it('debería agregar un nuevo profesional', async () => {
        const newProfessional = new Professional('09876543', 'Lopez', 'Mariana', 'Av. Libertador 2100', '34718277612', 'marianitalopez21889@gmail.com', new Date('1995-05-05')
        )
        const result = await repository.add(newProfessional)
        if (result.professional.id) {
            professionalId = result.professional.id
        }
        expect(result.professional).toHaveProperty('id')
        expect(result.professional.firstname).toBe('Mariana')
    })

    it('debería encontrar todos los profesionales', async () => {
        const professionals = await repository.findAll()
        expect(professionals).toBeInstanceOf(Array)
    })

    it('debería encontrar un profesional por ID', async () => {
        const professional = await repository.findOne({ id: professionalId.toString() })
        expect(professional).toHaveProperty('id', professionalId)
    })

    it('debería actualizar un profesional', async () => {
        const updatedProfessional = new Professional('432423112', 'Gonzalez', 'Peter', 'Calle Falsa 12334', '32432423432', 'juanccgonzalez8998@gmail.com', new Date('1990-02-01')
        )
        const result = await repository.update((professionalId.toString()), updatedProfessional)
        expect(result).toHaveProperty('firstname', 'Peter')
    })

    it('debería eliminar un profesional', async () => {
        const result = await repository.delete({ id: (professionalId.toString()) })
        expect(result).toHaveProperty('id', professionalId)
    })
})