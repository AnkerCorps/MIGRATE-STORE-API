import {createServer} from "node:http"
import { getAuthController } from "../controllers/Auth/auth-controller.js"

export class ServerSetup {
  boot(){
    const port = process.env.APP_SERVER_PORT
    this.initialize(port)
  }

  initialize(port){
    

    const server = createServer(async (req,res)=>{
      
      const {url,method} = req;
      if(url == '/'){
        res.write("<h1>Hello World</h1>")
      }
      if(url == '/register' && method =="GET"){
        res.write("<h1>register</h1>")
      }
      if(url=="/register" && method =='POST'){
        let body = ''
        req.on('data',chunk =>{
            body += chunk.toString()
        })
        req.on('end',() =>{
          const controller = getAuthController()
          controller.registerUser(body)
          res.end()
        })
        
      }
      if(url == '/login'){
        res.write("<h1>login</h1>")
      }
      res.end()
    })



    server.listen(port,()=>{
      console.log(`servidor rodando na porta http://localhost:${port}/`)
    })
  }
}