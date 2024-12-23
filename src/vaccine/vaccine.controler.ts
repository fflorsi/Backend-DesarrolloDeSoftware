import { Request, Response, NextFunction } from "express"
import { VaccineRepository } from "./vaccine.repository.js";
import { Vaccine } from "./vaccine.entity.js";

const repository = new VaccineRepository()

function sanitizeVaccineInput(req: Request, res: Response, next: NextFunction){
  req.body.sanitizedInput = {
    name: req.body.name
  }

  Object.keys(req.body.sanitizedInput).forEach(key =>{
    if(req.body.sanitizedInput[key]===undefined) delete req.body.sanitizedInput[key]
  })
  next()
}

async function findAll(req:Request, res:Response){  
    res.json({data: await repository.findAll() })
}

async function findOne(req:Request, res:Response) {  
    const id = req.params.id
    const vaccine = await repository.findOne({id})
    if (!vaccine) {
      return res.status(404).send({ message: 'Vaccine not found' })
    }
    res.json({ data: vaccine })
}

async function add(req:Request, res:Response) {  
    const input = req.body.sanitizedInput

    const vaccineInput = new Vaccine(
        input.name
    )

    const vaccine = await repository.add(vaccineInput)
    return res.status(201).json({message:'Vaccine created', data:vaccine})
}

async function update(req:Request, res:Response) { 
    req.body.sanitizedInput.id=req.params.id
    const vaccine= await repository.update(req.params.id, req.body.sanitizedInput)

    if(!vaccine){
       return res.status(404).send({message: 'Vaccine not found'}) 
    }
    
    return res.status(200).send({message:'Vaccine updated successfully', data:vaccine})
}

async function remove ( req: Request, res:Response ){ 
    const id=req.params.id
    const vaccine = await repository.delete({id})

    if(!vaccine){
        res.status(404).send({message: 'Vaccine not found'})
    } else {
    res.status(200).send({message:'Vaccine deleted succesfully'})
    }
}

export {sanitizeVaccineInput, findAll, findOne, add, update, remove}