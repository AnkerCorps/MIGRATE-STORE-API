
import { AuthService } from "../../services/auth/auth-service.js"
import { stdin } from "node:process"


export class AuthController{
  /**
       * @param {AuthService} service - Uma instância da classe de serviço.
       */
    constructor(service,validator){
       /** @type {AuthService} */
      this.service = service
      this.validator = validator
    }
      
    async registerUser(body){
     
      
      try {
        await this.service.signUser(body)
      } catch (error) {
        console.log(error.data)
      }

    }
  
  }
  

export function getAuthController(){
  const service = new AuthService
  return new AuthController(service)
}