
import { Request, Response, NextFunction } from "express"
import { observationRepository } from "./observation.repository"
import { observation } from "./observations.entity"

const repository = new observationRepository()

function sanitizeObservationInput(req:Request, res: Response, next: NextFunction){

    req.body.sanitizedInput = {
        name: req.body.name,
        professional: req.body.professional,
        description: req.body.description,
        medicalHistoryId: req.body.medicalHistoryId,
    } 
    //more checks here

    Object.keys(req.body.sanitizedInput).forEach(key=>{  
        if (req.body.sanitizedInput[key]===undefined) delete req.body.sanitizedInput[key]
})
    next()
}

async function findAll(req:Request, res:Response){  
    res.json({data: await repository.findAll() })
}

async function findOne(req:Request, res:Response) {  
    const id = req.params.id
    const observation = await repository.findOne({id})
    if (!observation) {
      return res.status(404).send({ message: 'Observation not found' })
    }
    res.json({ data: observation })
  }

async function add(req:Request, res:Response) {  
    const input = req.body.sanitizedInput

    const observationInput = new observation(
        input.name,
        input.professional,
        input.description,
        input.medicalHistoryId
    )

    const observations = await repository.add(observationInput)
    return res.status(201).json({message:'Observation created', data:observations})
}

async function update(req:Request, res:Response) { 
    req.body.sanitizedInput.id=req.params.id
    const observation= await repository.update(req.params.id, req.body.sanitizedInput)

    if(!observation){
       return res.status(404).send({message: 'Observation not found'}) 
    }
    
    return res.status(200).send({message:'Observation updated successfully', data:observation})
}



async function  remove ( req: Request, res:Response ){ 
    const id=req.params.id
    const observation = await repository.delete({id})

    if(!observation){
        res.status(404).send({message: 'Observation not found'})
    } else {
    res.status(200).send({message:'Observation deleted succesfully'})
    }
}

async function findByMedicalHistory(req:Request, res:Response){ 
    const id = req.params.id 
    res.json({data: await repository.findByMedicalHistory({id}) })
}



export { sanitizeObservationInput, findAll, findOne, add, update, remove, findByMedicalHistory }