import { Request, Response, NextFunction} from "express"
import { MedicalHistoryRepository } from "./medicalHistory.repository.js"
import { MedicalHistory } from "./medicalHistory.entity.js"
const repository = new MedicalHistoryRepository()


function sanitizeMedicalHistoryInput(req: Request, res: Response, next: NextFunction){
  req.body.sanitizedInput = {
    petId: req.body.petId,
    observations: req.body.observations,
    vaccines: req.body.vaccines,
    id: req.body.id
  }

  Object.keys(req.body.sanitizedInput).forEach(key=>{
    if(req.body.sanitizedInput[key] === undefined ){
      delete req.body.sanitizedInput[key]
    }
  })

  next()
}


async function findAll(req: Request, res: Response){
  res.json({data: await repository.findAll() })
}

function findOne(req: Request, res: Response){
  const id = req.params.id
  const medicalHistory = repository.findOne({id})
  if(!medicalHistory){
    return res.status(404).send({message:'Medical History Not Found'})
  }
  res.json({data: medicalHistory})
}

function add(req: Request, res: Response){
  const input = req.body.sanitizedInput

  const medicalHistoryInput = new MedicalHistory(
    input.petId, 
    input.observations, 
    input.vaccines 
  )

  const medicalHistory = repository.add(medicalHistoryInput)
  return res.status(201).send({message: 'Medical History created', data: medicalHistory})
}

function update(req: Request, res: Response){
  req.body.sanitizedInput.id = req.params.id
  const medicalHistory = repository.update(req.params.id, req.body.sanitizedInput)

  if(!medicalHistory){
    return res.status(404).send({message: 'Medical History not found'})
  }

  return res.status(200).send({message:'Medical History updated succesfully', data: medicalHistory })
}


function remove(req: Request, res: Response){
  const id = req.params.id
  const medicalHistory = repository.delete({id})

  if(!medicalHistory){
    res.status(404).send({message:'Medical History not found'})
  } else{
    res.status(200).send({message: 'Medical History deleted succesfully'})
  }
}

export { sanitizeMedicalHistoryInput, findAll, findOne, add, update, remove }