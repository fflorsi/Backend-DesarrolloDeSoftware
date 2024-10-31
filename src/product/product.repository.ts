import { Product as ProductModel } from './product.model.js'; // Importar modelo Sequelize
import { Product as ProductInterface } from './product.entity.js'; // Importar la interfaz

export class ProductRepository {
  
  // Obtener todos los productos
  public async findAll(): Promise<ProductInterface[]> {
    const products = await ProductModel.findAll();
    return products.map(product => product.toJSON() as ProductInterface); // Convertir a JSON
  }

  // Obtener un producto por ID
  public async findOne(item: { id: string }): Promise<ProductInterface | null> {
    const id = Number.parseInt(item.id);
    if (isNaN(id)) return null; // Cambiar undefined por null
    const product = await ProductModel.findByPk(id);
    return product ? (product.toJSON() as ProductInterface) : null; // Manejo de null
  }

  // Añadir un producto
  public async add(productInput: ProductInterface): Promise<ProductInterface> {
    const newProduct = await ProductModel.create(productInput);
    return newProduct.toJSON() as ProductInterface; // Convertir a JSON
  }

  // Actualizar un producte
  public async update(id: string, productInput: ProductInterface): Promise<ProductInterface | null> {
    const productId = Number.parseInt(id);

    if (isNaN(productId)) return null;

    const result = await ProductModel.update(productInput, {
        where: { id: productId },
        returning: true,
    });

    // Aquí se asegura que el resultado esté bien manejado
    const rowsUpdated = result[0]; // Número de filas actualizadas
    const updatedProducts = result[1]; // Instancias actualizadas

    console.log(`Rows updated: ${rowsUpdated}`);
    console.log(`Updated products: ${JSON.stringify(updatedProducts)}`);

    if (rowsUpdated === 0 || !updatedProducts[0]) return null;

    return updatedProducts[0].toJSON() as ProductInterface;
}


  // Borrar un producte
  public async delete(item: { id: string }): Promise<ProductInterface | null> {
    const productToDelete = await this.findOne(item);
    if (!productToDelete) return null; // Cambiar undefined por null
    await ProductModel.destroy({ where: { id: productToDelete.id } });
    return productToDelete; // Devuelve el producte eliminado
  }


}
