import { Repository } from "../shared/repository.js";
import { Pet } from "./pet.entity.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Pet as PetModel } from "./pet.model.js";
import { Type as TypeModel } from "../types/type.model.js";




export class PetRepository implements Repository<Pet>{
    public async findAll(): Promise<Pet[]> {
    const pets = await PetModel.findAll({
        include: [{
            model: TypeModel,
            attributes: ['name']
        }]
    })
    return pets.map(pet => pet.toJSON() as Pet)
    }
    

    public async findOne(item:{id:string}): Promise <Pet | undefined>{
        const id = Number.parseInt(item.id)
        if (isNaN(id)) return undefined
        const pet = await PetModel.findByPk(id,{
        include: [{
            model: TypeModel,
            attributes: ['name']
        }]
    })

        return pet ? (pet.toJSON()) : undefined
        
    }

    public async update(id:string, petInput:Pet): Promise<Pet | undefined>{
        const petId = Number.parseInt(id)
        if (isNaN(petId)) return undefined
           try {
        // Perform the update
        const [rowsUpdated] = await PetModel.update(petInput, {
            where: { id: petId },
        })
        console.log(`Rows updated: ${rowsUpdated}`)
        if (rowsUpdated === 0) return undefined
        const updatedPet = await PetModel.findByPk(petId);
        if (!updatedPet) return undefined
        return updatedPet.toJSON() as Pet;
            } catch (error) {
        console.error('Error during update:', error);
        return undefined;
    }
    }
    
   
    public async add(petInput:Pet): Promise <Pet | undefined>{
        const newPet = await PetModel.create(petInput)
        return newPet.toJSON() as Pet
    }
   
    public async delete(item:{id:string}): Promise <Pet | undefined>{
    const petToDelete = await this.findOne(item)
    if (!petToDelete) return undefined
    await PetModel.destroy({ where: { id: item
        .id } });
    return petToDelete; // Devuelve el cliente eliminado
    }

    public async findByClientId(item: { clientId: string }): Promise<Pet[] | undefined> {
        const id = Number.parseInt(item.clientId)
        if (isNaN(id)) return undefined
        const pets:Pet[] = await PetModel.findAll({ where: { clientId: id } })

        return pets ? (pets) : undefined
    }
}
    
