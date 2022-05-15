import InfoService from '../services/info.service.js';

export default class InfoController {
  constructor() {
    this.infoService = new InfoService();

    this.getInfo = this.getInfo.bind(this);
  }

  async getInfo(req, res) {
    try {
      const info = await this.infoService.getInfo();
      console.log(info);
      res.status(200).render('info', { info: info });
    } catch (error) {
      console.log(error);
    }
  }
}
