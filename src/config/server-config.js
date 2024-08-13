import {createServer} from "node:http"
import { getAuthController } from "../controllers/Auth/auth-controller.js"
import  fs from "node:fs"
import { join } from "node:path"
const path = join(process.cwd(),'src','pages','index.html')

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
        const indexHtml = await fs.promises.readFile(path,(err,data)=>{
          if(err) throw new Error(err)
          
        })
        res.write(indexHtml.toString())
        
        
      }
      if(url=="/register" && method =='POST'){
        let body = ''
        req.on('data',chunk =>{
            body += chunk.toString()
        })
        req.on('end', async () => {
          try {
              if (body) {
                  const parsedBody = JSON.parse(body);
                  console.log('Corpo da requisição:', parsedBody);
                  const controller = getAuthController();
                  await controller.registerUser(parsedBody);
                  res.end("Usuário registrado com sucesso");
              } 
          } catch (error) {
              res.end("Erro ao registrar usuário: " + error.message);
          }
      });
        
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