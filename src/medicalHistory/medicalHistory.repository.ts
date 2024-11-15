import { Repository } from "../shared/repository.js";
import { MedicalHistory } from "./medicalHistory.entity.js";
import { pool } from "../shared/db/conn.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { observation } from "../observation/observations.entity.js";
import { MedicalHistory as MedicalHistoryModel } from "./medicalHistory.model.js";
import { Vaccine as VaccineModel } from "../vaccine/vaccine.model.js";


export class MedicalHistoryRepository implements Repository<MedicalHistory>{

public async findAll(): Promise<MedicalHistory[] | undefined> {
        const medicalHistories = await MedicalHistoryModel.findAll({
          include: [{
            model: VaccineModel,
            through: { attributes: [] } 
        }]
    });
    return medicalHistories.map(medicalHistory => medicalHistory.toJSON() as MedicalHistory)
  }

public async findByPetId(petId: { id: string }): Promise<MedicalHistory | undefined> {
    const id = Number.parseInt(petId.id);
    if (isNaN(id)) return undefined;
    const medicalHistory = await MedicalHistoryModel.findOne({
        where: { petId: id },
        include: [{
            model: VaccineModel,
            through: { attributes: [] } // Esto excluye los atributos de la tabla intermedia
        }]
    });
    return medicalHistory ? (medicalHistory.toJSON()) : undefined;
}  
    

public async findOne(medicalHistoryId: { id: string }): Promise<MedicalHistory | undefined> {
    const id = Number.parseInt(medicalHistoryId.id);
    if (isNaN(id)) return undefined;
    const medicalHistory = await MedicalHistoryModel.findOne({
        where: { id: id },
        include: [{
            model: VaccineModel,
            through: { attributes: [] } // Esto excluye los atributos de la tabla intermedia
        }]
    });
    return medicalHistory ? (medicalHistory.toJSON()) : undefined;
}
  

  public async add(medicalHistoryInput: MedicalHistory): Promise<MedicalHistory | undefined> {
        const newMedicalHistory = await MedicalHistoryModel.create(medicalHistoryInput)
        return newMedicalHistory.toJSON() as MedicalHistory
  }

  public async update(id: string, medicalHistoryInput: MedicalHistory): Promise<MedicalHistory | undefined> {
    const medicalHistoryId = Number.parseInt(id)
        if (isNaN(medicalHistoryId)) return undefined
           try {
        // Perform the update
        const [rowsUpdated] = await MedicalHistoryModel.update(medicalHistoryInput, {
            where: { id: medicalHistoryId },
        });

        console.log(`Rows updated: ${rowsUpdated}`);

        // If no rows were updated, return null
        if (rowsUpdated === 0) return undefined;

        // Fetch the updated instance
        const updatedMedicalHistory = await MedicalHistoryModel.findByPk(medicalHistoryId);
        if (!updatedMedicalHistory) return undefined;

        return updatedMedicalHistory.toJSON() as MedicalHistory;
    } catch (error) {
        console.error('Error during update:', error);
        return undefined;
    }
  }

  public async delete(item: { id: string }): Promise<MedicalHistory | undefined> {
    const medicalHistoryToDelete = await this.findOne(item);
    if (!medicalHistoryToDelete) return undefined; // Cambiar undefined por null
    await MedicalHistoryModel.destroy({ where: { id: item
        .id } });
    return medicalHistoryToDelete; // Devuelve el cliente eliminado
  }

  public async addVaccine(medicalHistoryId: string, vaccineId: number): Promise<MedicalHistory | undefined> {
  const medicalHistory = await MedicalHistoryModel.findByPk(medicalHistoryId);
  const vaccine = await VaccineModel.findByPk(vaccineId);

  if (!medicalHistory || !vaccine) {
    return undefined; // Retorna undefined si no se encuentra la historia médica o la vacuna
  }

  // Relaciona la vacuna con la historia médica
  await medicalHistory.addVaccine(vaccine); // Esto asume que tienes la relación definida en el modelo

  return medicalHistory.toJSON() as MedicalHistory; // Retorna la historia médica actualizada
  }

  public async removeVaccine(medicalHistoryId: string, vaccineId: number): Promise<MedicalHistory | undefined> {
    const medicalHistory = await MedicalHistoryModel.findByPk(medicalHistoryId);
    const vaccine = await VaccineModel.findByPk(vaccineId);

    if (!medicalHistory || !vaccine) {
        return undefined; // Retorna undefined si no se encuentra la historia médica o la vacuna
    }

    // Desvincula la vacuna de la historia médica
    await medicalHistory.removeVaccine(vaccine); // Esto asume que tienes la relación definida en el modelo

    return medicalHistory.toJSON() as MedicalHistory; // Retorna la historia médica actualizada
  }
  }
