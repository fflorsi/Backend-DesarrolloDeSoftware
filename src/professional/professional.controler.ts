import { Request, Response, NextFunction } from "express";
import { ProfessionalRepository } from "./professional.repository.js";
import { Professional } from "./professionals.entity.js";

const repository = new ProfessionalRepository();

function sanitizeProfessionalInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
        dni: req.body.dni,
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        birthDate: req.body.birthDate,
        id: req.body.id
    };

    
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
          delete req.body.sanitizedInput[key]
        }
      })
      next()
    
}

async function findAll(req: Request, res: Response) {
    try {
        const professionals = await repository.findAll();
        res.json({ data: professionals });
    } catch (error) {
        console.error('Error fetching all professionals:', error);
        res.status(500).json({ message: 'Unable to fetch professionals' });
    }
}

async function findOne(req: Request, res: Response) {
    const id = Number.parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).send({ message: 'Invalid id parameter' });
    }
  
    // Cambiamos la consulta para que use la cadena `id` en lugar del número directamente
    const professional = await repository.findOne({ id: id.toString() });
    if (!professional) {
      return res.status(404).send({ message: 'Professional not found findOne' });
    }
  
    res.json({ data: professional });
  }

async function add(req: Request, res: Response) {
    const input = req.body.sanitizedInput;
    try {
        const professional = await repository.add(input);
        return res.status(201).json({ message: 'Professional created', data: professional });
    } catch (error) {
        console.error('Error creating professional:', error);
        res.status(500).json({ message: 'Unable to create professional' });
    }
}

async function update(req: Request, res: Response) {
    const id = req.params.id;
    const input = { ...req.body.sanitizedInput, id };

    try {
        const professional = await repository.update(id, input);
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
    } catch (error) {
        console.error('Error updating professional:', error);
        res.status(500).json({ message: 'Unable to update professional' });
    }
}

async function remove(req: Request, res: Response) {
    const { id } = req.params;
    const professional = await repository.delete({ id });

    if (!professional) {
        return res.status(404).send({ message: 'Professional not found' });
        }
        res.status(200).send({ message: 'Professional deleted successfully' });
}

export { sanitizeProfessionalInput, findAll, findOne, add, update, remove };
