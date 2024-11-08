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
        const medicalHistory = await MedicalHistoryModel.findByPk(id)
        return medicalHistory ? (medicalHistory.toJSON()) : undefined
    }
  

  public async add(medicalHistoryInput: MedicalHistory): Promise<MedicalHistory | undefined> {
    const {id, vaccines, ...medicalHistoryRow} = medicalHistoryInput
    const [result] = await pool.query<ResultSetHeader>('insert into medicalHistories set ?', [medicalHistoryRow])
    medicalHistoryInput.id = result.insertId
    for (const vaccine of [vaccines]){
      await pool.query('insert into medicalHistories_vaccines set ?',{medicalHistoryId: medicalHistoryInput.id, vaccineId: vaccine})
    }
    return medicalHistoryInput
  }

  public async update(id: string, medicalHistoryInput: MedicalHistory): Promise<MedicalHistory | undefined> {
    const medicalHistoryId = Number.parseInt(id)
    const {vaccines, ...medicalHistoryRow} = medicalHistoryInput
    await pool.query('update medicalHistories set ? where id = ?',[medicalHistoryRow,medicalHistoryId])
    
    await pool.query('delete from medicalHistories_vaccines where medicalHistoryId = ?', [medicalHistoryId])
  
    if([vaccines]?.length>0){
      for (const vaccineId of [vaccines]){
        await pool.query('insert into medicalHistories_vaccines set ?',{medicalHistoryId,vaccineId})
      }
    }
    return await this.findOne({id})
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
