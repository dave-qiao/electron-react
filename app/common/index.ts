interface DpsParam {
  port: string;
  ip: string;
  nodeAddress: string;
}

class Dps {
  constructor() {
    // this.port = param.port;
    // this.ip = param.ip;
  }

  test(param: DpsParam) {
    console.log('test typescript', param.port, param.ip, param.nodeAddress);
  }
}

const DPS = new Dps();
export default DPS;
