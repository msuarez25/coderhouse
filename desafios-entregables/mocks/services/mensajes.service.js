import '../database/config/db.js';
import { MensajeModule } from '../database/modules/mensajes.modules.js';
import generateMensajes from '../utils/mensajes.utils.js';

export default class MensajesService {
  constructor() {}

  async createMensaje(cant = 5) {
    for (let i = 0; i < cant; i++) {
      const fakeMensaje = generateMensajes();
      await MensajeModule.create(fakeMensaje);
    }
    return await MensajeModule.find();
  }

  async getMensajes() {
    return await MensajeModule.find();
  }

  async addMensaje(data) {
    if (data !== '') {
      data.timestamp = Date.now();
      return await MensajeModule.create(data);
    }
    return false;
  }

  async deleteMensaje(id) {
    try {
      return await MensajeModule.deleteOne({ _id: id });
    } catch (error) {
      console.log(error);
    }
  }
}
