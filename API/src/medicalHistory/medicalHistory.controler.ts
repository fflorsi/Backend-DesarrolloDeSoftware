import { Request, Response, NextFunction} from "express"
import { MedicalHistoryRepository } from "./medicalHistory.repository.js"
import { MedicalHistory } from "./medicalHistory.entity.js"
const repository = new MedicalHistoryRepository()


function sanitizeMedicalHistoryInput(req: Request, res: Response, next: NextFunction){
  req.body.sanitizedInput = {
    petId: req.body.petId,
    vaccines: req.body.vaccines
  }

  Object.keys(req.body.sanitizedInput).forEach((key)=>{
    if(req.body.sanitizedInput[key] === undefined ){
      delete req.body.sanitizedInput[key]
    }
  })

  next()
}


async function findAll(req: Request, res: Response){
  res.json({data: await repository.findAll() })
}

async function findOne(req: Request, res: Response){
  const id = req.params.id
  const medicalHistory = await repository.findOne({id})
  if(!medicalHistory){
    return res.status(404).send({message:'Medical History Not Found'})
  }
  res.json({data: medicalHistory})
}

async function add(req: Request, res: Response){
  const input = req.body.sanitizedInput

  const medicalHistoryInput = new MedicalHistory(
    input.petId, 
    input.vaccines,
    input.observations
  )

  const medicalHistory = await repository.add(medicalHistoryInput)
  return res.status(201).send({message: 'Medical History created', data: medicalHistory})
}

async function update(req: Request, res: Response){
  req.body.sanitizedInput.id = req.params.id
  const medicalHistory = await repository.update(req.params.id, req.body.sanitizedInput)

  if(!medicalHistory){
    return res.status(404).send({message: 'Medical History not found'})
  }

  return res.status(200).send({message:'Medical History updated succesfully', data: medicalHistory })
}


async function remove(req: Request, res: Response){
  const id = req.params.id
  const medicalHistory = await repository.delete({id})

  if(!medicalHistory){
    res.status(404).send({message:'Medical History not found'})
  } else{
    res.status(200).send({message: 'Medical History deleted succesfully'})
  }
}

export { sanitizeMedicalHistoryInput, findAll, findOne, add, update, remove }