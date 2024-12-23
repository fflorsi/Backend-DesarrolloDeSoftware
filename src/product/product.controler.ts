import { Request, Response, NextFunction } from 'express'
import { ProductRepository } from './product.repository.js'
import { Product} from './product.entity.js'


const repository = new ProductRepository()

function sanitizeProductInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    category: req.body.category,
  };


  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

async function findAll(req: Request, res: Response) {
  res.json({ data: await repository.findAll() })
}


async function findOne(req: Request, res: Response) {
  const id = Number.parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).send({ message: 'Invalid id parameter' });
  }
  const product = await repository.findOne({ id: id.toString() });
  if (!product) {
    return res.status(404).send({ message: 'Product not found findOne' });
  }
  res.json({ data: product });
}

async function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput;

  const productInput = new Product(
    input.name,
    input.description,
    input.price,
    input.stock,
    input.category,

  );

  try {
    const product = await repository.add(productInput); // Espera la inserción en la base de datos
    return res.status(201).send({ message: 'Product created', data: product});
  } catch (error) {
    console.error('Error adding product:', error);
    return res.status(500).send({ message: 'Failed to create product' });
  }
}

async function update(req: Request, res: Response) {
  try {
    // Verificación adicional para asegurarse de que los datos estén completos
    const productInput = req.body.sanitizedInput;
  if (!productInput) {
    return res.status(400).send({ message: 'Input data is missing or invalid' });
  }

    const product = await repository.update(req.params.id, productInput);
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }

    return res.status(200).send({ message: 'Product updated successfully', data: product });
  } catch (error:any) {
    console.error('Error updating product:', error.message || error);
    return res.status(500).send({ message: 'Failed to update product', error: error.message });
  }
}



async function remove(req: Request, res: Response) {
  const { id } = req.params;
  const product = await repository.delete({ id });

  if (!product) {
    return res.status(404).send({ message: 'Product not found' });
  }
  return res.status(200).send({ message: 'Product deleted successfully' });
}



export { sanitizeProductInput, findAll, findOne, add, update, remove, }