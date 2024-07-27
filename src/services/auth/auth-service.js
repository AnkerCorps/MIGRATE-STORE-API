import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const _filename = fileURLToPath(import.meta.url)
const dbPath = path.join(path.dirname(_filename),'../','../','db','Mock.json')


export class AuthService{

  constructor(){
   
  }

  //input user in database
  async signUser(userData){
    
    try {
      //find mock database
      const data = (await fs.promises.readFile(dbPath,{encoding:'utf8'}))
      //parsing string to object
      let res = JSON.parse(data)
      // transform userData from string to object 
      let newUser = JSON.parse(userData)
      //push user to array
      res.users.push(newUser)
   
      // transform the array in string again
      res = JSON.stringify(res)
      //write in database
      await fs.promises.writeFile(dbPath,res,{
        encoding:'utf-8'
      })
      return 'usuário cadastrado com sucesso'
    } catch (error) { 
      console.log(error.message)
    }
  }

  

}




