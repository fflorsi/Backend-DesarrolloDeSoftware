import { Request, Response, NextFunction } from "express";
import { ProfessionalRepository } from "./professional.repository.js";
import { Professional } from "./professionals.entity.js";

const repository = new ProfessionalRepository();

function sanitizeProfessionalInput(req: Request, res: Response, next: NextFunction) {
    const sanitizedInput: Partial<Professional> = {
        dni: req.body.dni,
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        birthDate: req.body.birthDate,
        id: req.body.id
    };

    // Remueve cualquier campo no definido o inválido
    (Object.keys(sanitizedInput) as Array<keyof Professional>).forEach((key) => {
        if (sanitizedInput[key] === undefined || sanitizedInput[key] === '') {
            delete sanitizedInput[key];
        }
    });
    

    req.body.sanitizedInput = sanitizedInput;
    next();
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
    const id = req.params.id;
    try {
        const professional = await repository.findOne({ id });
        if (!professional) {
            return res.status(404).send({ message: 'Professional not found' });
        }
        res.json({ data: professional });
    } catch (error) {
        console.error('Error fetching professional by ID:', error);
        res.status(500).json({ message: 'Unable to fetch professional' });
    }
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
    const id = req.params.id;
    try {
        const professional = await repository.delete({ id });
        if (!professional) {
            return res.status(404).send({ message: 'Professional not found' });
        }
        res.status(200).send({ message: 'Professional deleted successfully' });
    } catch (error) {
        console.error('Error deleting professional:', error);
        res.status(500).json({ message: 'Unable to delete professional' });
    }
}

export { sanitizeProfessionalInput, findAll, findOne, add, update, remove };
