import { useState, useEffect, useContext, } from "react";
import $ from "jquery";
import "jquery-mask-plugin";
import Api from "./Api";
import Util from "./Util";
import { ThemeContext } from "./App";

const options = {
  onKeyPress: function (cpf, ev, el, op) {
    var masks = ['000.000.000-000', '00.000.000/0000-00'];
    $('#destinatario_cpf_cnpj').mask((cpf.length > 14) ? masks[1] : masks[0], op);
  }
}

const Destinatario = () => {
  const fields = useContext(ThemeContext);

  const [nomeDestinatario, setNomeDestinatario] = useState('');
  const [cpfCnpjDestinatario, setCpfCnpjDestinatario] = useState('');
  const [enderecoDestinatario, setEnderecoDestinatario] = useState('');
  const [cepDestinatario, setCepDestinatario] = useState('');
  const [cidadeUfDestinatario, setCidadeUfDestinatario] = useState('');

  const handleCPFCNPJDestinatario = (e) => {
    setCpfCnpjDestinatario(e.target.value);
    // console.log(cpfCnpjDestinatario);

    if (cpfCnpjDestinatario) {
      // Check CPF
      let res = null
      if (e.target.value.trim().length <= 14) {
        res = Util.checkCPF(e.target.value)
        res ? e.target.setCustomValidity('') : e.target.setCustomValidity('CPF inválido');
      } else if (e.target.value.trim().length <= 18) {
        res = Util.checkCNPJ(e.target.value)
        res ? e.target.setCustomValidity('') : e.target.setCustomValidity('CNPJ inválido');
      }
      fields.destinatario[1].isValid = res;
    }
  }

  useEffect(() => {
    $('#destinatario_cpf_cnpj').length > 11 ? $('#destinatario_cpf_cnpj').mask('00.000.000/0000-00', options) : $('#destinatario_cpf_cnpj').mask('000.000.000-00#', options);
    $('#destinatario_cep').mask('00000-000');

    if (enderecoDestinatario.trim().length === 0 && cepDestinatario.trim().length === 9) {
      new Api().getCEPData(cepDestinatario).then((data) => {
        if (data.erro) {
          // CEP inválido
          return;
        }
        setEnderecoDestinatario(`${data.logradouro ? data.logradouro : 'XXX'} - Bairro ${data.bairro ? data.bairro : 'XXX'} ${data.complemento ? 'Complemento: ' + data.complemento : ''}`);
        setCidadeUfDestinatario(`${data.localidade}/${data.uf}`);
      });
    }

    // Update fields
    fields.destinatario[0].value = nomeDestinatario;
    fields.destinatario[1].value = cpfCnpjDestinatario;
    fields.destinatario[2].value = enderecoDestinatario;
    fields.destinatario[3].value = cepDestinatario;
    fields.destinatario[4].value = cidadeUfDestinatario;

  }, [fields.destinatario, nomeDestinatario, cpfCnpjDestinatario, enderecoDestinatario, cepDestinatario, cidadeUfDestinatario]);

  return (
    <>
      <tr>
        <th colSpan="4" className="text-center">Destinatário</th>
      </tr>
      <tr>
        <td colSpan="3">
          <label htmlFor="destinatario_nome">Nome:*</label>
          <input type="text" id="destinatario_nome" required value={nomeDestinatario} maxLength={50} onInput={(e) => setNomeDestinatario(e.target.value)} />
        </td>
        <td>
          <label htmlFor="destinatario_cpf_cnpj">CPF<span className="arial">/</span>CNPJ:*</label>
          <input type="text" id="destinatario_cpf_cnpj" pattern="[\w\.\-]{14}|[\w\.\-\/]{18}" title="Digite 14 dígitos para CPF ou 18 dígitos para CNPJ" required value={cpfCnpjDestinatario} onInput={handleCPFCNPJDestinatario} />
        </td>
      </tr>
      <tr>
        <td colSpan="4">
          <label htmlFor="destinatario_endereco">Endereço:*</label>
          <input type="text" id="destinatario_endereco" required value={enderecoDestinatario} maxLength={80} onInput={(e) => setEnderecoDestinatario(e.target.value)} />
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor="destinatario_cep">CEP:*</label>
          <input type="text" id="destinatario_cep" minLength={9} pattern="\d{5}\-\d{3}" title="Digite os dígitos para o CEP" required value={cepDestinatario} onInput={(e) => setCepDestinatario(e.target.value)} />
        </td>
        <td colSpan="3">
          <label htmlFor="destinatario_cidade_uf">Cidade<span className="arial">/</span>UF:*</label>
          <input type="text" id="destinatario_cidade_uf" required value={cidadeUfDestinatario} maxLength={50} onInput={(e) => setCidadeUfDestinatario(e.target.value)} />
        </td>
      </tr></>
  )
}

export default Destinatario;