import { Repository } from "../shared/repository.js";
import { Professional } from "./professionals.entity.js";
import { pool } from "../shared/db/conn.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";

/*const professionals = [
    new Professional(
        '44021044',
        'Larroquette',
        'Juan Bautista',
        'Izarra 1244',
        '3400 5330080',
        'juan@gmail.com',
        '8/8/2002',
        'a02b91bc-3769-4221-beb1-d7a3aeba7dad'
    ),
]*/

export class ProfessionalRepository implements Repository<Professional>{
    public async findAll(): Promise<Professional[] | undefined> {
        const [professionals] = await pool.query('select * from professionals')
        return professionals as Professional[]
    }

    public async findOne(item:{id: string}): Promise<Professional | undefined> {
        const id = Number.parseInt(item.id)
        const [professionals] = await pool.query<RowDataPacket[]>('select * from professionals where id = ?', [id])
        if(professionals.length ===0){
            return undefined
        }
        const professional = professionals[0] as Professional

        return professional
    }

    public async add(professionalInput: Professional): Promise<Professional | undefined> {
        const {id,...professionalRow} = professionalInput
        const [result] =  await pool.query<ResultSetHeader>('insert into professionals set ?', [professionalRow]) 
        professionalInput.id=result.insertId
        return professionalInput
    }
 
    public  async update(id:string, professionalInput: Professional): Promise<Professional | undefined> {
        const professionalId = Number.parseInt(id)
        const {...professionalRow} = professionalInput
        await pool.query('update professionals set ? where id = ?', [professionalRow, professionalId] )
        return professionalInput 
    }
    public async delete(item:{id: string; }): Promise<Professional | undefined>{
        try {
        const professionalToDelete =await this.findOne(item);
        const professionalId = Number.parseInt(item.id)
        await pool.query('delete from professionals where id = ?', professionalId)
        return professionalToDelete;
        } catch (error: any){
            throw new Error('Unable to delete professional')
        }
    }
}