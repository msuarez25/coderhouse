import '../database/config/db.js';
import { CarModule } from '../database/modules/cars.modules.js';
import ProductoService from '../services/producto.service.js';
import logger from '../utils/loggers.js';

export default class CarService {
  constructor() {
    this.productoService = new ProductoService();
  }

  async addCar() {
    try {
      return await CarModule.create([[]]);
    } catch (error) {
      logger.log('error', error.message);
    }
  }

  async deleteCarById(id) {
    try {
      return await CarModule.deleteOne({ _id: id });
    } catch (error) {
      logger.log('error', error.message);
    }
  }

  async getProductsFromCar(id) {
    try {
      const car = await CarModule.findOne({ _id: id });
      console.log(car.productos);
      return car.productos;
    } catch (error) {
      logger.log('error', error.message);
    }
  }

  async addProductToCarById(id, id_prod) {
    try {
      const productos = await CarModule.findOne({ _id: id });
      if (productos.productos.length > -1) {
        const product = await this.productoService.getProducto(id_prod);
        return await CarModule.updateOne(
          { _id: id },
          { $push: { productos: product } }
        );
      }
      return false;
    } catch (error) {
      logger.log('error', error.message);
    }
  }

  async deleteProductFromCarById(id, id_prod) {
    try {
      const productos = await CarModule.findOne({ _id: id });
      if (productos.productos.length > -1) {
        const product = await this.productoService.getProducto(id_prod);

        return await CarModule.updateOne(
          { _id: id },
          { $pull: { productos: product } }
        );
      }
      return false;
    } catch (error) {
      logger.log('error', error.message);
    }
  }
}
