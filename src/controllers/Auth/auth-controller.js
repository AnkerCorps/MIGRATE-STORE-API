
import { AuthService } from "../../services/auth/auth-service.js"
import { stdin } from "node:process"


export class AuthController {
  constructor(service, validator) {
      this.service = service;
      this.validator = validator;
  }

  async registerUser(body) {
      try {
          console.log('Dados recebidos no controller:', body); // Adicione esse log para depuração

          if (typeof body !== 'object' || !body.cpf) {
              throw new Error("Dados do usuário inválidos: CPF não encontrado");
          }
          
          await this.service.signUser(body);
          console.log("Usuário registrado com sucesso");
      } catch (error) {
          console.log("Erro ao registrar usuário:", error.message);
          throw error;
      }
  }
}
export function getAuthController(){
  const service = new AuthService
  return new AuthController(service)
}