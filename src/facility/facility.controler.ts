import {Request, Response, NextFunction} from 'express';
import { FacilityRepository } from './facility.repository';
import { Facility } from './facility.entity';

const repository = new FacilityRepository();

function sanitizeFacilityInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    name: req.body.name,
    description: req.body.description,
    capacity: req.body.capacity,
    price: req.body.price,
  };
  //more checks here

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

async function findAll(req: Request, res: Response) {
  res.json({data: await repository.findAll()})
}

async function findOne(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid id parameter' });
    }
    const facility = await repository.findOne({ id: id.toString() });
    if (!facility) {
        return res.status(404).json({ message: 'Facility not found' });
    }
    res.json({ data: facility });
}

async function add(req: Request, res: Response) {
    const input = req.body.sanitizedInput;

    const  facilityInput = new Facility(
        input.name,
        input.description,
        input.price,
    );
    try{
        const facility = await repository.add(facilityInput);
        return res.status(201).json({ message: 'Facility created', data: facility });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating facility' });
    }
}

async function update(req: Request, res: Response) {
    try{
        const facilityInput = req.body.sanitizedInput;
        if (!facilityInput) {
            return res.status(400).json({ message: 'Invalid input' });
        }

        const facility = await repository.update(req.params.id, facilityInput);
        if (!facility) {
            return res.status(404).json({ message: 'Facility not found' });
        }
        return res.json({ message: 'Facility updated', data: facility });
        } catch (error:any) {
            return res.status(500).json({ message: 'Error updating facility' });
        }
    }

async function remove(req: Request, res: Response) {
    const {id} = req.params;
    const facility = await repository.delete({ id });

    if (!facility) {
        return res.status(404).json({ message: 'Facility not found' });
    }
    return res.json({ message: 'Facility deleted' });
}

async function searchByName(req: Request, res: Response) {
    let  name  = req.query.name;
    console.log(name)
    if (!name || typeof name !== 'string') {
        name = ''
    }

    const facilities = await repository.findByName(name);
    res.json({ data: facilities });
}

export { sanitizeFacilityInput, findAll, findOne, add, update, remove, searchByName }