class Api {
  #request = async (url) => {
    try {
      const response = await fetch(url);
      return response.json();
    } catch (error) {
      return error;
    }
  }

  getCEPData = async (cep) => {
    const new_cep = cep.match(/\d+/g).join('');
    const url = `https://viacep.com.br/ws/${new_cep}/json/`;
    return await this.#request(url);
  }
}

export default Api;