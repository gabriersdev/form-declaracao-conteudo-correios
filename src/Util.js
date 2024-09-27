class Util {
  static isEven(n) {
    return n % 2 === 0;
  }

  static checkCPF(cpf) {
    let resultado = false;
    const CPF_replaced = cpf.replace(/\D/g, '');

    if (CPF_replaced.toString().split().every((e) => e === CPF_replaced.toString[0])) return false;
    if (CPF_replaced.toString().length !== 11 || /^(\d)\1{10}$/.test(CPF_replaced)) return false;

    resultado = true;

    [9, 10].forEach((j) => {
      let soma = 0;
      let r;
      CPF_replaced.split(/(?=)/).splice(0, j).forEach((e, i) => {
        soma += parseInt(e, 10) * ((j + 2) - (i + 1));
      });
      r = soma % 11;
      r = (r < 2) ? 0 : 11 - r;
      if (r !== parseInt(CPF_replaced.substring(j, j + 1), 10)) resultado = false;
    });

    return resultado;
  }

  static checkCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') return false;

    if (cnpj.length != 14) return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
      cnpj == "11111111111111" ||
      cnpj == "22222222222222" ||
      cnpj == "33333333333333" ||
      cnpj == "44444444444444" ||
      cnpj == "55555555555555" ||
      cnpj == "66666666666666" ||
      cnpj == "77777777777777" ||
      cnpj == "88888888888888" ||
      cnpj == "99999999999999")
      return false;

    // Valida DVs
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    let resultado = 0;

    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    if (resultado != digitos.charAt(0)) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)) return false;

    return true;
  }

  #format(value, pattern) {
    let i = 0;
    const v = value.toString();
    return pattern.replace(/#/g, _ => v[i++]);
  }

  // String Mask
  stringMask(type, value) {
    try {
      let newValue = value;
      try {
        newValue = value.match(/\d/g).join('')
      } catch (error) {
        console.log(error, value);
        newValue = value;
      }

      if (type === 'verify') {
        if (newValue.length == 11) type = 'cpf';
        else if (newValue.length == 14) type = 'cnpj';
        else if (newValue.length == 8) type = 'cep';
      }

      switch (type.toLowerCase()) {
        case 'cpf':
          return this.#format(newValue, '###.###.###-##');
        case 'cnpj':
          return this.#format(newValue, '##.###.###/####-##');
        case 'cep':
          return this.#format(newValue, '#####-###');
      }
    } catch (error) {
      console.log(error);
      return value;
    }
  }
}

export default Util;