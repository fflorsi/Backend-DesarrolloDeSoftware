import { Request, Response, NextFunction } from "express"
import { typesRepository } from "./type.repository";

const repository = new typesRepository()


async function findAll(req:Request, res:Response){  
    res.json({data: await repository.findAll() })
}

async function findOne(req:Request, res:Response) {  
    const id = req.params.id
    const type = await repository.findOne({id})
    if (!type) {
      return res.status(404).send({ message: 'Type not found' })
    }
    res.json({ data: type })
  }

export {findAll, findOne}