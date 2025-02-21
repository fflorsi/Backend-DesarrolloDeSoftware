import { Request, Response, NextFunction} from "express"
import { MedicalHistoryRepository } from "./medicalHistory.repository"
import { MedicalHistory } from "./medicalHistory.entity"
const repository = new MedicalHistoryRepository()


function sanitizeMedicalHistoryInput(req: Request, res: Response, next: NextFunction){
  req.body.sanitizedInput = {
    petId: req.body.petId
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
    input.petId
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

async function findByPetId(req: Request, res: Response) {
  const id = req.params.id
  const medicalHistory = await repository.findByPetId({id})
  if(!medicalHistory){
    return res.status(404).send({message:'Medical History Not Found'})
  }
  res.json({data: medicalHistory})

}

async function addVaccineToMedicalHistory(req: Request, res: Response) {
  const medicalHistoryId = req.params.id; // ID de la historia médica
  const vaccineId = req.body.vaccineId; // ID de la vacuna que se va a agregar

  // Verifica si la historia médica existe
  const medicalHistory = await repository.findOne({ id: medicalHistoryId });
  if (!medicalHistory) {
    return res.status(404).send({ message: 'Medical History Not Found' });
  }

  // Agrega la vacuna a la historia médica
  const updatedMedicalHistory = await repository.addVaccine(medicalHistoryId, vaccineId);
  if (!updatedMedicalHistory) {
    return res.status(404).send({ message: 'Vaccine Not Found or already added' });
  }

  return res.status(200).send({ message: 'Vaccine added to Medical History successfully', data: updatedMedicalHistory });
}

async function removeVaccineFromMedicalHistory(req: Request, res: Response) {
    const medicalHistoryId = req.params.id; // ID de la historia médica
    const vaccineId = req.query.vaccineId; // Accede al vaccineId desde los parámetros de consulta

    // Verifica si vaccineId está definido y es convertible a número
    const vaccineIdNumber = Array.isArray(vaccineId) ? vaccineId[0] : vaccineId; // Maneja el caso de array
    const vaccineIdParsed = vaccineIdNumber ? Number(vaccineIdNumber) : undefined;

    if (vaccineIdParsed === undefined || isNaN(vaccineIdParsed)) {
        return res.status(400).send({ message: 'Invalid vaccine ID' });
    }

    console.log(`Removing vaccine with ID ${vaccineIdParsed} from medical history with ID ${medicalHistoryId}`);
    
    // Verifica si la historia médica existe
    const medicalHistory = await repository.findOne({ id: medicalHistoryId });
    if (!medicalHistory) {
        return res.status(404).send({ message: 'Medical History Not Found' });
    }

    // Desvincula la vacuna de la historia médica
    const updatedMedicalHistory = await repository.removeVaccine(medicalHistoryId, vaccineIdParsed);
    if (!updatedMedicalHistory) {
        return res.status(404).send({ message: 'Vaccine Not Found or not linked to the Medical History' });
    }

    return res.status(200).send({ message: 'Vaccine removed from Medical History successfully', data: updatedMedicalHistory });
}

export { sanitizeMedicalHistoryInput, findAll, findOne, add, update, remove, findByPetId, addVaccineToMedicalHistory, removeVaccineFromMedicalHistory }