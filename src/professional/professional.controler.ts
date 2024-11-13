//MANEJA OPERACIONES, LLAMADOS, ENTRADASM SALIDAS DEL SISTEMA
import { Request, Response, NextFunction } from "express"
import { ProfessionalRepository } from "./professional.repository.js"
import { Professional } from "./professionals.entity.js"

const repository = new ProfessionalRepository()

function sanitizeProfessionalInput(req:Request, res: Response, next: NextFunction){

    req.body.sanitizedInput = {
        dni: req.body.dni,
        lastname: req.body.lastname,
        name: req.body.name,
        adress: req.body.adress,
        phone_number: req.body.phone_number,
        mail: req.body.mail,
        birth_date: req.body.birth_date,
        id: req.body.id
    } 
    //more checks here

    Object.keys(req.body.sanitizedInput).forEach(key=>{  //quitamos cada elemento que no queremos
        if (req.body.sanitizedInput[key]===undefined) delete req.body.sanitizedInput[key]
})
    next()
}

async function findAll(req:Request, res:Response){  //Obtiene todos los professionals
    res.json({data: await repository.findAll() })
}

async function findOne(req:Request, res:Response) {  //Obtiene UN professional de professionals
    const id = req.params.id
    const professional = await repository.findOne({id})
    if (!professional) {
      return res.status(404).send({ message: 'Professional not found' })
    }
    res.json({ data: professional })
  }

async function add(req:Request, res:Response) {  //Crea un nuevo professional en professionals
    const input = req.body.sanitizedInput

    const professionalInput = new Professional(
        input.dni, 
        input.lastname, 
        input.name, 
        input.adress, 
        input.phone_number, 
        input.mail, 
        input.birth_date,
        input.id
    )

    const professionals= await repository.add(professionalInput)
    return res.status(201).json({message:'Professional created', data:professionals})
}

async function update(req: Request, res: Response) {
    req.body.sanitizedInput.id = req.params.id;
    const professional = await repository.update(req.params.id, req.body.sanitizedInput);

    if (!professional) {
        return res.status(404).json({
            isSuccess: false,
            message: 'Professional not found',
            status: 'error'
        });
    }

    return res.status(200).json({
        isSuccess: true,
        message: 'Professional updated successfully',
        status: 'success',
        data: professional
    });
}





async function  remove ( req: Request, res:Response ){ //Elimina un professional de professionals
    const id=req.params.id
    const professional = await repository.delete({id})

    if(!professional){
        res.status(404).send({message: 'Professional not found'})
    } else {
    res.status(200).send({message:'Professional deleted successfully'})
    }
}



export { sanitizeProfessionalInput, findAll, findOne, add, update, remove }