import ProductoService from '../services/producto.service.js';

export default class ProductoController {
  constructor() {
    this.productoService = new ProductoService();

    this.createProducto = this.createProducto.bind(this);
    this.getProductos = this.getProductos.bind(this);
    this.getProducto = this.getProducto.bind(this);
    this.addProducto = this.addProducto.bind(this);
    this.updateProducto = this.updateProducto.bind(this);
    this.deleteProducto = this.deleteProducto.bind(this);
  }

  async createProducto(req, res) {
    const { cant } = req.query;
    try {
      const response = await this.productoService.createProducto(cant);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async getProductos(req, res) {
    try {
      const response = await this.productoService.getProductos();
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async getProducto(req, res) {
    let id = null;
    if (req.params.id) id = req.params.id;
    try {
      const response = await this.productoService.getProducto(id);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async addProducto(req, res) {
    const data = req.body;
    console.log('data:', data);
    // const file = req.file;
    const response = await this.productoService.addProducto(data);
    if (response) {
      res.redirect(`/productos/?prodId=${response}`);
    } else {
      res.json({ error: 'Producto no pudo ser agregado' });
    }
  }

  async updateProducto(req, res) {
    const { id } = req.params;
    const { body } = req;
    try {
      const response = await this.productoService.updateProducto(id, body);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProducto(req, res) {
    const { id } = req.params;
    try {
      const response = await this.productoService.deleteProducto(id);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }
}
