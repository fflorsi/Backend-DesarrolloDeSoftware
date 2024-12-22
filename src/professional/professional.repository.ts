import { Repository } from "../shared/repository.js";
import { Professional as ProfessionalInterface } from "./professionals.entity.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Sequelize } from "sequelize";
import { Professional as ProfessionalModel } from '../professional/professional.model.js';

export class ProfessionalRepository {
    public async findAll(): Promise<ProfessionalInterface[] | undefined> {
        try {
            const professionals = await ProfessionalModel.findAll();
            return professionals.map(professional => professional.toJSON() as ProfessionalInterface);
        } catch (error) {
            console.error('Error fetching professionals:', error);
            throw new Error('Unable to fetch professionals');
        }
    }

    public async findOne(item: { id: string }): Promise<ProfessionalInterface | undefined> {
        const id = Number.parseInt(item.id);
        try {
            const professional = await ProfessionalModel.findByPk(id);
            return professional ? (professional.toJSON() as ProfessionalInterface) : undefined;
        } catch (error) {
            console.error('Error fetching professional by ID:', error);
            throw new Error('Unable to fetch professional');
        }
    }

    public async add(professionalInput: Omit<ProfessionalInterface, 'id'>): Promise<ProfessionalInterface | undefined> {
        try {
            const newProfessional = await ProfessionalModel.create(professionalInput);
            return newProfessional.toJSON() as ProfessionalInterface;
        } catch (error) {
            console.error('Error adding professional:', error);
            throw new Error('Unable to add professional');
        }
    }

    public async update(id: string, professionalInput: Partial<ProfessionalInterface>): Promise<ProfessionalInterface | undefined> {
        const professionalId = Number.parseInt(id);
        try {
            const professionalToUpdate = await ProfessionalModel.findByPk(professionalId);
            if (!professionalToUpdate) return undefined;
            
            await professionalToUpdate.update(professionalInput);
            return professionalToUpdate.toJSON() as ProfessionalInterface;
        } catch (error) {
            console.error('Error updating professional:', error);
            throw new Error('Unable to update professional');
        }
    }

    public async delete(item: { id: string }): Promise<ProfessionalInterface | undefined> {
        const professionalId = Number.parseInt(item.id);
        try {
            const professionalToDelete = await ProfessionalModel.findByPk(professionalId);
            if (!professionalToDelete) return undefined;
            
            await professionalToDelete.destroy();
            return professionalToDelete.toJSON() as ProfessionalInterface;
        } catch (error) {
            console.error('Error deleting professional:', error);
            throw new Error('Unable to delete professional');
        }
    }
}
