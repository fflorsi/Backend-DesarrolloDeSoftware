import { Repository } from "../shared/repository";
import { Vaccine } from "./vaccine.entity";
import { Vaccine as VaccineModel } from "./vaccine.model";

export class VaccineRepository implements Repository<Vaccine>{
  
  public async findAll(): Promise<Vaccine[] | undefined> {
    const vaccines = await VaccineModel.findAll()
    return vaccines.map(vaccine => vaccine.toJSON() as Vaccine)
  }

  public async findOne(vaccine: {id: string }): Promise<Vaccine | undefined> {
    const id = Number.parseInt(vaccine.id)
    if (isNaN(id)) return undefined
    const vaccineFound = await VaccineModel.findByPk(id)
    return vaccineFound ? (vaccineFound.toJSON()): undefined
  }

  public async add(vaccineInput: Vaccine): Promise<Vaccine> {
    const newVaccine = await VaccineModel.create(vaccineInput)
    return newVaccine.toJSON() as Vaccine

  }

  public async update(id: string, vaccineInput: Vaccine): Promise<Vaccine | undefined> {
    const vaccineId = Number.parseInt(id)
    if (isNaN(vaccineId)) return undefined
    try{
      const [rowsUpdated] = await VaccineModel.update(vaccineInput,{
        where: {id: vaccineId},
      })
      console.log(`Rows updated: ${rowsUpdated}`)
      if (rowsUpdated === 0) return undefined
      const updatedVaccine = await VaccineModel.findByPk(vaccineId)
      if (!updatedVaccine) return undefined
      return updatedVaccine.toJSON() as Vaccine
    }
    catch (error){
      console.error('Error during update:', error)
      return undefined
    }

  }

  public async delete(vaccine: { id: string }): Promise<Vaccine | undefined> {
    const vaccineToDelete = await this.findOne(vaccine);
    if (!vaccineToDelete) return undefined; 
    await VaccineModel.destroy({ where: { id: vaccineToDelete
        .id } });
    return vaccineToDelete; 
  }

}