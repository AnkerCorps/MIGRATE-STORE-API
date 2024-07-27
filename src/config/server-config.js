import {createServer} from "node:http"

export class ServerSetup {
  boot(){
    const port = process.env.APP_SERVER_PORT
    this.initialize(port)
  }

  initialize(port){
    console.log('port',port)

    const server = createServer((req,res)=>{
      const url = req.url
      if(url == '/'){
        res.write("<h1>Hello World</h1>")
      }
      if(url == '/register'){
        res.write("<h1>register</h1>")
      }
      if(url == '/login'){
        res.write("<h1>login</h1>")
      }
      res.end()
    })



    server.listen(port,()=>{
      console.log('servidor rodando na porta ',port)
    })
  }
}