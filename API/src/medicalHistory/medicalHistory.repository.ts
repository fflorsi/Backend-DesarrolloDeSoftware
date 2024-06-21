import { Repository } from "../shared/repository.js";
import { MedicalHistory } from "./medicalHistory.entity.js";
import { pool } from "../shared/db/conn.js";


export class MedicalHistoryRepository implements Repository<MedicalHistory>{

  public async findAll(): Promise<MedicalHistory[] | undefined> {
    const [medicalHistories] = await pool.query('select * from medicalhistories')
    for (const medicalHistory of medicalHistories as MedicalHistory[]){
      const [vaccines] = await pool.query('select vaccineId from medicalhistories_vaccines where medicalHistoryId = ?',[medicalHistory.id])
      medicalHistory.vaccines = (vaccines as {vaccineId: number}[]).map((vaccine)=>vaccine.vaccineId)
      //const vaccineNames: string[] = []
      //for (const vaccineIdObj of vaccineIds as {vaccineId: number}[]){
        //const [vaccines] = await pool.query('select name from vaccines where id = ?',[vaccineIdObj.vaccineId])

        //vaccineNames.push(vaccines[0].name);

      };
      //medicalHistory.vaccines = vaccineNames
    
    return medicalHistories as MedicalHistory[]
    }

  public async findOne(vaccine: {id: string }): Promise<MedicalHistory | undefined> {
    throw new Error('not implemented')
  }

  public async add(vaccine: MedicalHistory): Promise<MedicalHistory | undefined> {
    throw new Error('not implemented')
  }

  public async update(id: string, vaccine: MedicalHistory): Promise<MedicalHistory | undefined> {
    throw new Error('not implemented')
  }

  public async delete(vaccine: { id: string }): Promise<MedicalHistory | undefined> {
    throw new Error('not implemented')
    }
  }
