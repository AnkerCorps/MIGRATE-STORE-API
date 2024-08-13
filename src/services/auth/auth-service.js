import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { CPFUtils } from "../../utils/validateCPF.js";

const _filename = fileURLToPath(import.meta.url)
const dbPath = path.join(path.dirname(_filename),'../','../','db','Mock.json')


export class AuthService {
  constructor() {}

  async signUser(userData) {
      try {
          
          JSON.stringify(userData)
          console.log(userData);
          console.log(userData.cpf)
          // Validação do CPF
          if (!CPFUtils.validarCPF(userData.cpf)) {
              throw new Error("CPF inválido");
          }
          console.log("cpf valido");
          
          // Verificação de existência do usuário no DB
          const existingUser = await this.getUserByCPF(userData.cpf);
          if (existingUser) {
              throw new Error("Usuário já existe");
          }

          console.log("talvez");
          

          // Leitura do banco de dados
          const data = await fs.promises.readFile(dbPath, { encoding: 'utf8' });
          let res = JSON.parse(data);

          // Adiciona o novo usuário
          res.users.push(userData);

          // Transforma em string novamente e escreve no banco de dados
          res = JSON.stringify(res);
          await fs.promises.writeFile(dbPath, res, { encoding: 'utf-8' });
          return 'Usuário cadastrado com sucesso';
      } catch (error) {
          console.log(error.message);
          throw error;
      }
  }

// Obtém um usuário pelo CPF
async getUserByCPF(cpf) {
    try {
        const data = await fs.promises.readFile(dbPath, { encoding: 'utf8' });
        const users = JSON.parse(data).users;
        return users.find(user => user.cpf === cpf) || null;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

/*//input user in database
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
  }*/

}




