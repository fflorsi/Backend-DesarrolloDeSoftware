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
 
    public async update(id:string, observationInput: observation): Promise<observation | null> {
        const observationId = Number.parseInt(id)
        if (isNaN(observationId)) return null
           try {
        // Perform the update
        const [rowsUpdated] = await ObservationModel.update(observationInput, {
            where: { id: observationId },
        });

        console.log(`Rows updated: ${rowsUpdated}`);

        // If no rows were updated, return null
        if (rowsUpdated === 0) return null;

        // Fetch the updated instance
        const updatedObservation = await ObservationModel.findByPk(observationId);
        if (!updatedObservation) return null;

        return updatedObservation.toJSON() as observation;
    } catch (error) {
        console.error('Error during update:', error);
        return null;
    }
    }
    public async delete(item:{id: string; }): Promise<observation | null>{
    const observationToDelete = await this.findOne(item);
    if (!observationToDelete) return null; // Cambiar undefined por null
    await ObservationModel.destroy({ where: { id: observationToDelete
        .id } });
    return observationToDelete; // Devuelve el cliente eliminado
  }
}