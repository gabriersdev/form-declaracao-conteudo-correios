import { useState, useEffect } from "react";
import $ from "jquery";
import "jquery-mask-plugin";
import Api from "./Api";
import Util from "./Util";

const options = {
  onKeyPress: function (cpf, ev, el, op) {
    var masks = ['000.000.000-000', '00.000.000/0000-00'];
    $('#destinatario_cpf_cnpj').mask((cpf.length > 14) ? masks[1] : masks[0], op);
  }
}

const Destinatario = (props) => {
  const [nomeDestinatario, setNomeDestinatario] = useState('');
  const [cpfCnpjDestinatario, setCpfCnpjDestinatario] = useState('');
  const [enderecoDestinatario, setEnderecoDestinatario] = useState('');
  const [cepDestinatario, setCepDestinatario] = useState('');
  const [cidadeUfDestinatario, setCidadeUfDestinatario] = useState('');

  useEffect(() => {
    $('#destinatario_cpf_cnpj').length > 11 ? $('#destinatario_cpf_cnpj').mask('00.000.000/0000-00', options) : $('#destinatario_cpf_cnpj').mask('000.000.000-00#', options);
    $('#destinatario_cep').mask('00000-000');

    // TODO - Terminar a validação do CPF e CNPJ
    if (cpfCnpjDestinatario.trim().length === 14) {
      // Check CPF
      console.log(Util.checkCPF(cpfCnpjDestinatario) ? `CPF ${cpfCnpjDestinatario} válido` : `CPF ${cpfCnpjDestinatario} inválido`);
    } else if (cpfCnpjDestinatario.trim().length === 18) {
      // Check CNPJ
    }

    if (enderecoDestinatario.trim().length === 0 && cepDestinatario.trim().length === 9) {
      new Api().getCEPData(cepDestinatario).then((data) => {
        console.log(data.bairro);
        if (data.erro) {
          // CEP inválido
          return;
        }
        setEnderecoDestinatario(`${data.logradouro ? data.logradouro : 'XXX'} - Bairro ${data.bairro ? data.bairro : 'XXX'} ${data.complemento ? 'Complemento: ' + data.complemento : ''}`);
        setCidadeUfDestinatario(`${data.localidade}/${data.uf}`);
      });
    }
  }, [cpfCnpjDestinatario, cepDestinatario, enderecoDestinatario]);

  return (
    <>
      <tr>
        <th colSpan="4" className="text-center">Destinatário</th>
      </tr>
      <tr>
        <td colSpan="3">
          <label htmlFor="destinatario_nome">Nome: </label>
          <input type="text" id="destinatario_nome" required value={nomeDestinatario} onChange={(e) => setNomeDestinatario(e.target.value)} />
        </td>
        <td>
          <label htmlFor="destinatario_cpf_cnpj">CPF<span className="arial">/</span>CNPJ: </label>
          <input type="text" id="destinatario_cpf_cnpj" pattern="[\w\.\-]{14}|[\w\.\-\/]{18}" title="Digite 14 dígitos para CPF ou 18 dígitos para CNPJ" required value={cpfCnpjDestinatario} onChange={(e) => setCpfCnpjDestinatario(e.target.value)} />
        </td>
      </tr>
      <tr>
        <td colSpan="4">
          <label htmlFor="destinatario_endereco">Endereço: </label>
          <input type="text" id="destinatario_endereco" required value={enderecoDestinatario} onChange={(e) => setEnderecoDestinatario(e.target.value)} />
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor="destinatario_cep">CEP: </label>
          <input type="text" id="destinatario_cep" minLength={8} title="Digite 8 dígitos para o CEP" required value={cepDestinatario} onChange={(e) => setCepDestinatario(e.target.value)} />
        </td>
        <td colSpan="3">
          <label htmlFor="destinatario_cidade_uf">Cidade<span className="arial">/</span>UF:</label>
          <input type="text" id="destinatario_cidade_uf" required value={cidadeUfDestinatario} onChange={(e) => setCidadeUfDestinatario(e.target.value)} />
        </td>
      </tr></>
  )
}

export default Destinatario;