import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import Product from '@modules/products/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const product = await productsRepository.findOne(id);
    if (!product) {
      throw new AppError('Produto informado não foi localizado.');
    }
    const productExists = await productsRepository.findByName(name);
    if (productExists && name !== product.name) {
      throw new AppError('Um Produto com esse nome já existe!');
    }
    product.name = name;
    product.price = price;
    product.quantity = quantity;

    return await productsRepository.save(product);
  }
}

export default UpdateProductService;
