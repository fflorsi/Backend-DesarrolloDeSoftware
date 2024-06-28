import { Repository } from "../shared/repository.js";
import { MedicalHistory } from "./medicalHistory.entity.js";
import { pool } from "../shared/db/conn.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";


export class MedicalHistoryRepository implements Repository<MedicalHistory>{

//Se deberia modificar para traer mascotas en ves de id de mascota
public async findAll(): Promise<MedicalHistory[] | undefined> {
    const [medicalHistories] = await pool.query('SELECT * FROM medicalhistories');
    for (const medicalHistory of medicalHistories as MedicalHistory[]) {
        const [vaccineIds] = await pool.query('SELECT vaccineId FROM medicalhistories_vaccines WHERE medicalHistoryId = ?', [medicalHistory.id]);
        const vaccines = [];
        for (const vaccineIdObj of vaccineIds as {vaccineId: number}[]) {
            const [vaccine] = await pool.query<RowDataPacket[]>('SELECT * FROM vaccines WHERE id = ?', [vaccineIdObj.vaccineId]);
            if (vaccine.length > 0) {
                vaccines.push(vaccine[0]);
            }
        }
        medicalHistory.vaccines = vaccines;
    }
    return medicalHistories as MedicalHistory[];
}

//Se deberia modificar para traer mascotas en ves de id de mascota
public async findOne(vaccine: {id: string}): Promise<MedicalHistory | undefined> {
    const id = Number.parseInt(vaccine.id);
    const [medicalHistories] = await pool.query<RowDataPacket[]>('SELECT * FROM medicalhistories WHERE id = ?', [id]);
    
    if (medicalHistories.length === 0) {
        return undefined;
    }
    
    const medicalHistory = medicalHistories[0] as MedicalHistory;
    const [vaccineIds] = await pool.query('SELECT vaccineId FROM medicalhistories_vaccines WHERE medicalHistoryId = ?', [medicalHistory.id]);
    
    const vaccines = [];
    for (const vaccineIdObj of vaccineIds as {vaccineId: number}[]) {
        const [vaccine] = await pool.query<RowDataPacket[]>('SELECT * FROM vaccines WHERE id = ?', [vaccineIdObj.vaccineId]);
        if (vaccine.length > 0) {
            vaccines.push(vaccine[0]);
        }
    }
    medicalHistory.vaccines = vaccines;
    
    return medicalHistory;
}

  public async add(medicalHistoryInput: MedicalHistory): Promise<MedicalHistory | undefined> {
    const {id, vaccines, ...medicalHistoryRow} = medicalHistoryInput
    const [result] = await pool.query<ResultSetHeader>('insert into medicalHistories set ?', [medicalHistoryRow])
    medicalHistoryInput.id = result.insertId
    for (const vaccine of vaccines){
      await pool.query('insert into medicalHistories_vaccines set ?',{medicalHistoryId: medicalHistoryInput.id, vaccineId: vaccine})
    }
    return medicalHistoryInput
  }

  public async update(id: string, medicalHistoryInput: MedicalHistory): Promise<MedicalHistory | undefined> {
    const medicalHistoryId = Number.parseInt(id)
    const {vaccines, ...medicalHistoryRow} = medicalHistoryInput
    await pool.query('update medicalHistories set ? where id = ?',[medicalHistoryRow,medicalHistoryId])
    
    await pool.query('delete from medicalHistories_vaccines where medicalHistoryId = ?', [medicalHistoryId])
  
    if(vaccines?.length>0){
      for (const vaccineId of vaccines){
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
  }
