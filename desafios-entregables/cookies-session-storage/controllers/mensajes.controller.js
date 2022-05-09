import MensajesService from '../services/mensajes.service.js';

export default class MensajeController {
  constructor() {
    this.mensajesService = new MensajesService();

    this.createMensaje = this.createMensaje.bind(this);
    this.getMensajes = this.getMensajes.bind(this);
    this.addMensaje = this.addMensaje.bind(this);
    this.deleteMensaje = this.deleteMensaje.bind(this);
  }

  async createMensaje(req, res) {
    const { cant } = req.query;
    try {
      const response = await this.mensajesService.createMensaje(cant);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async getMensajes(req, res) {
    try {
      const response = await this.mensajesService.getMensajes();
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async getMensaje(req, res) {
    let id = null;
    if (req.query.id) id = req.query.id;
    try {
      const response = await this.mensajesService.getMensaje(id);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async addMensaje(req, res) {
    const data = req.body;
    console.log('data:', data);
    // const file = req.file;
    const response = await this.mensajesService.addMensaje(data);
    if (response) {
      res.status(200).json(response);
    } else {
      res.json({ error: 'Mensaje no pudo ser agregado' });
    }
  }

  async deleteMensaje(req, res) {
    const { id } = req.params;
    try {
      const response = await this.mensajesService.deleteProducto(id);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }
}
