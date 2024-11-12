import { Repository } from "../shared/repository.js";
import { MedicalHistory } from "./medicalHistory.entity.js";
import { pool } from "../shared/db/conn.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { observation } from "../observation/observations.entity.js";
import { MedicalHistory as MedicalHistoryModel } from "./medicalHistory.model.js";
import { Vaccine as VaccineModel } from "../vaccine/vaccine.model.js";
import { MedicalHistoryVaccineModel } from "./medicalHistory_vaccine.model.js";


export class MedicalHistoryRepository implements Repository<MedicalHistory>{

  public async findAll(): Promise<MedicalHistory[] | undefined> {
    const medicalHistories = await MedicalHistoryModel.findAll()
    return medicalHistories.map(medicalHistory => medicalHistory.toJSON() as MedicalHistory)
    }

  public async findOne(petId: {id: string }): Promise<MedicalHistory | undefined> {
        const id = Number.parseInt(petId.id)
        if (isNaN(id)) return undefined
        const medicalHistory = await MedicalHistoryModel.findOne({ where: { petId: id } })
        return medicalHistory ? (medicalHistory.toJSON()) : undefined
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

  public async delete(vaccine: { id: string }): Promise<MedicalHistory | undefined> {
    try{
    const medicalHistoryToDelete = await this.findOne(vaccine)
    const medicalHistoryId = Number.parseInt(vaccine.id)
    await pool.query('delete from medicalHistories_vaccines where medicalHistoryId = ?',medicalHistoryId)
    await pool.query('delete from medicalHistories where id = ?',medicalHistoryId)
    return medicalHistoryToDelete
    } catch(error:any){
      throw new Error('Unable to delete Medical History')
    }
  }

  public async findOneWithVaccines(petId: { id: string }): Promise<{ medicalHistory: MedicalHistory | undefined; vaccines: string[] }> {
    const id = Number.parseInt(petId.id);
    if (isNaN(id)) return { medicalHistory: undefined, vaccines: [] };
    const medicalHistory = await MedicalHistoryModel.findByPk(id);
    if (!medicalHistory) return { medicalHistory: undefined, vaccines: [] };
    const medicalHistoryJson = medicalHistory.toJSON();
    const vaccineIds: MedicalHistoryVaccineModel[] = await MedicalHistoryVaccineModel.findAll({
        where: { medicalHistoryId: id },
        attributes: ['vaccineId']
    });
    const ids = vaccineIds.map(vaccine => vaccine.vaccineId);
    const vaccines = await VaccineModel.findAll({
        where: {
            id: ids
        },
        attributes: ['name']
    });
    const vaccineNames = vaccines.map(vaccine => vaccine.name);
    return { medicalHistory: medicalHistoryJson, vaccines: vaccineNames };
}

  }
