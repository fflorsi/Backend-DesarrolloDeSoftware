import { type } from "./type.entity";
import { Type as TypeModel} from "./type.model";

export class typesRepository{
  public async findAll(): Promise<type[]>{
    const types = await TypeModel.findAll()
    return types.map(type => type.toJSON() as type)
  }

  public async findOne(type:{id: string}): Promise<type | undefined>{
    const id = Number.parseInt(type.id)
    if (isNaN(id)) return undefined
    const typeFound = await TypeModel.findByPk(id)
    return typeFound ? (typeFound.toJSON()) : undefined

  }
}