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

  // TODO - Implementar a validação do CNPJ
  checkCNPJ() {
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
      const newValue = value.match(/\d/g).join('')

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