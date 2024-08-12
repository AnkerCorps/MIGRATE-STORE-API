// precisso tira esse negocio daqui
// criar campo de validação do usuario
export class CPFUtils {
    static validarCPF(cpf) {

        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11) return false;
        if (/^(\d)\1+$/.test(cpf)) return false;

        let soma = 0;
        let peso = [10, 9, 8, 7, 6, 5, 4, 3, 2];
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * peso[i];
        }

        let digito1 = (soma % 11) < 2 ? 0 : 11 - (soma % 11);
        if (parseInt(cpf.charAt(9)) !== digito1) return false;

        soma = 0;
        peso = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * peso[i];
        }

        let digito2 = (soma % 11) < 2 ? 0 : 11 - (soma % 11);
        if (parseInt(cpf.charAt(10)) !== digito2) return false;

        return true; 
    }
}