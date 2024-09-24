
import { Request, Response, NextFunction } from "express"
import { observationRepository } from "./observation.repository.js"
import { observation } from "./observations.entity.js"

const repository = new observationRepository()

function sanitizeObservationInput(req:Request, res: Response, next: NextFunction){

    req.body.sanitizedInput = {
        name: req.body.name,
        dificultyLevel: req.body.dificultyLevel,
        materialsUsed: req.body.materialsUsed,
        description: req.body.description,
        datePerformed: req.body.datePerformed,
        id: req.body.id
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
        input.dificultyLevel,
        input.materialsUsed,
        input.description,
        input.datePerformed,
        input.id
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



export { sanitizeObservationInput, findAll, findOne, add, update, remove }