import { Repository } from "../shared/repository.js";
import { observation } from "./observations.entity.js";
import { pool } from "../shared/db/conn.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Observation as ObservationModel } from "./observation.model.js";


export class observationRepository{
    public async findAll(): Promise<observation[]> {
        const observations = await ObservationModel.findAll()
        return observations.map(observation => observation.toJSON() as observation)
    }

    public async findOne(item:{id: string}): Promise<observation | undefined> {
        const id = Number.parseInt(item.id)
        if (isNaN(id)) return undefined
        const observation = await ObservationModel.findByPk(id)

        return observation ? (observation.toJSON()) : undefined
    }

    public async add(observationInput: observation): Promise<observation> {
        const newObservation = await ObservationModel.create(observationInput)
        return newObservation.toJSON() as observation
    }
 
    public async update(id:string, observationInput: observation): Promise<observation | undefined> {
        const observationId = Number.parseInt(id)
        const {...observationRow} = observationInput
        await pool.query('update observations set ? where id = ?', [observationRow, observationId] )
        return observationInput 
    }
    public async delete(item:{id: string; }): Promise<observation | undefined>{
        try {
        const observationToDelete =await this.findOne(item);
        const observationId = Number.parseInt(item.id)
        await pool.query('delete from observations where id = ?', observationId)
        return observationToDelete;
        } catch (error: any){
            throw new Error('Unable to delete observation')
        }
    }
}