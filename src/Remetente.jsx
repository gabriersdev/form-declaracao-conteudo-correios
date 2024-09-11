import { useContext, useEffect, useState } from "react";
import $ from "jquery";
import "jquery-mask-plugin";
import Api from "./Api";
import Util from "./Util";
import { ThemeContext } from "./App";

let i = 0;

const options = {
  onKeyPress: function (cpf, ev, el, op) {
    var masks = ['000.000.000-000', '00.000.000/0000-00'];
    $('#remetente_cpf_cnpj').mask((cpf.length > 14) ? masks[1] : masks[0], op);
  }
}

// New Promise ...
const infoData = () => {
  fetch('./private-data.json').then((response) => response.json()).then((data) => data)
  const mode = 1
  if (mode === 0 || mode === 2) {
    return new Promise((resolve) => {
      resolve(fetch('./public-data.json').then((response) => response.json()).then((data) => data))
    });
  } else if (mode === 1) {
    return new Promise((resolve) => {
      resolve(fetch('./private-data.json').then((response) => response.json()).then((data) => data))
    });
  }
}

const Remetente = () => {
  const fields = useContext(ThemeContext);

  const [nomeRemetente, setNomeRemetente] = useState();
  const [cpfCnpjRemetente, setCpfCnpjRemetente] = useState();
  const [enderecoRemetente, setEnderecoRemetente] = useState('');
  const [cepRemetente, setCepRemetente] = useState('');
  const [cidadeUfRemetente, setCidadeUfRemetente] = useState('');

  const handleCPFCNPJRemetente = (e) => {
    setCpfCnpjRemetente(e.target.value);

    if (cpfCnpjRemetente) {
      // Check CPF
      Util.checkCPF(e.target.value) ? e.target.setCustomValidity('') : e.target.setCustomValidity('CPF inválido');
      // console.log(Util.checkCPF(cpfCnpjRemetente) ? `CPF ${cpfCnpjRemetente} válido` : `CPF ${cpfCnpjRemetente} inválido`);
    }
  }

  useEffect(() => {
    // Gambiarra para evitar que a função infoData() seja chamada a cada renderização de um dos componentes monitorados pelo useEffect
    if (i === 0) {
      infoData()
        .then((data) => {
          // console.log(data);
          if (data.nome) setNomeRemetente(data.nome);
          if (data.cpf_cnpj) setCpfCnpjRemetente(new Util().stringMask('cpf', data.cpf_cnpj));
          if (data.endereco) setEnderecoRemetente(data.endereco);
          if (data.cep) setCepRemetente(new Util().stringMask('cep', data.cep));
          if (data.cidade_uf) setCidadeUfRemetente(data.cidade_uf);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    i++;

    $('#remetente_cpf_cnpj').length > 11 ? $('#remetente_cpf_cnpj').mask('00.000.000/0000-00', options) : $('#remetente_cpf_cnpj').mask('000.000.000-00#', options);
    $('#remetente_cep').mask('00000-000');

    // TODO - Separar em funções específicas
    if (enderecoRemetente.trim().length === 0 && cepRemetente.trim().length === 9) {
      new Api().getCEPData(cepRemetente).then((data) => {
        if (data.erro) {
          // CEP inválido
          return;
        }
        setEnderecoRemetente(`${data.logradouro ? data.logradouro : 'XXX'} - Bairro ${data.bairro ? data.bairro : 'XXX'} ${data.complemento ? 'Complemento: ' + data.complemento : ''}`);
        setCidadeUfRemetente(`${data.localidade}/${data.uf}`);
      });
    }

    fields.remetente[0].value = nomeRemetente;
    fields.remetente[1].value = cpfCnpjRemetente;
    fields.remetente[2].value = enderecoRemetente;
    fields.remetente[3].value = cepRemetente;
    fields.remetente[4].value = cidadeUfRemetente;

  },
    // Componentes monitorados
    [fields.remetente, nomeRemetente, cpfCnpjRemetente, enderecoRemetente, cepRemetente, cidadeUfRemetente]);

  return (
    <>
      <tr>
        <th colSpan="4" className="text-center">Remetente</th>
      </tr>
      <tr>
        <td colSpan="3">
          <label htmlFor="remetente_nome">Nome:*</label>
          <input type="text" id="remetente_nome" required value={nomeRemetente} onChange={(e) => setNomeRemetente(e.target.value)} />
        </td>
        <td>
          <label htmlFor="remetente_cpf_cnpj">CPF<span className="arial">/</span>CNPJ:*</label>
          <input type="text" id="remetente_cpf_cnpj" pattern="[\w\.\-]{14}|[\w\.\-\/]{18}" title="Digite 14 dígitos para CPF ou 18 dígitos para CNPJ" required value={cpfCnpjRemetente} onChange={handleCPFCNPJRemetente} />
        </td>
      </tr>
      <tr>
        <td colSpan="4">
          <label htmlFor="remetente_endereco">Endereço:*</label>
          <input type="text" id="remetente_endereco" required value={enderecoRemetente} onChange={(e) => setEnderecoRemetente(e.target.value)} />
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor="remetente_cep">CEP:*</label>
          <input type="text" id="remetente_cep" minLength={8} title="Digite 8 dígitos para o CEP" required value={cepRemetente} onChange={(e) => setCepRemetente(e.target.value)} />
        </td>
        <td colSpan="3">
          <label htmlFor="remetente_cidade_uf">Cidade<span className="arial">/</span>UF:*</label>
          <input type="text" id="remetente_cidade_uf" required value={cidadeUfRemetente} onChange={(e) => setCidadeUfRemetente(e.target.value)} />
        </td>
      </tr>
    </>
  )
}

export default Remetente;