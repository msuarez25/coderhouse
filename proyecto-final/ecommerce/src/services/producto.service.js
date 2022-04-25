import createProducto from '../utils/producto.utils.js';
import db from '../database/config/db.js';
import { v4 } from 'uuid';
const query = db.collection('productos');

export default class ProductoService {
  constructor() {}

  async createProducto(cant = 10) {
    for (let i = 0; i < cant; i++) {
      try {
        const fakeProducto = createProducto();
        await query.add(fakeProducto);
      } catch (err) {
        console.log(err);
      }
    }
  }

  async getProductos() {
    try {
      let response = await query.get();
      response = response.docs.map((doc) => {
        return {
          id: doc.id,
          nombre: doc.data().nombre,
          code: doc.data().code,
          precio: doc.data().precio,
          foto: doc.data().foto,
          timestamp: doc.data().timestamp,
          stock: doc.data().stock,
        };
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async getProducto(id) {
    try {
      const strId = id.toString();
      const doc = query.doc(strId);
      const item = await doc.get();
      const response = item.data();
      response.id = doc.id;
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async addProducto(data) {
    try {
      if (data !== '') {
        data.timestamp = Date.now();
        data.code = v4();
        //   data.foto = file.path.replace('public', '');
        return await query.add(data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async updateProducto(id, data) {
    try {
      return await query.doc(id).update(data);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProducto(id) {
    try {
      return await query.doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  }
}
