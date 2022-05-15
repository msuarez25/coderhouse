import minimist from 'minimist';

export default class InfoService {
  constructor() {}

  async getInfo() {
    const args = minimist(process.argv);
    const info = {
      args: args,
      path: process.execPath,
      os: process.platform,
      pid: process.pid,
      nodev: process.version,
      projectFolder: process.cwd(),
      rss: process.memoryUsage(),
    };
    return info;
  }
}
