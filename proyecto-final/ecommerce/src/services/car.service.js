import '../database/config/db.js';
import { CarModule } from '../database/modules/cars.modules.js';
import ProductoService from '../services/producto.service.js';

export default class CarService {
  constructor() {
    this.productoService = new ProductoService();
  }

  async addCar() {
    try {
      return await CarModule.create([[]]);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteCarById(id) {
    try {
      return await CarModule.deleteOne({ _id: id });
    } catch (error) {
      console.log(error);
    }
  }

  async getProductsFromCar(id) {
    try {
      const car = await CarModule.findOne({ _id: id });
      console.log(car.productos);
      return car.productos;
    } catch (error) {
      console.log(error);
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
      console.log(error);
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
      console.log(error);
    }
  }
}
