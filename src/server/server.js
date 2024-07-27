
import { ServerSetup } from "../config/server-config.js";

export class Server{
  start(){
    const setup =  new ServerSetup()
    setup.boot()
  }
}