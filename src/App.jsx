import './App.css'
import Conteudo from './Conteudo'
import Destinatario from './Destinatario'
import Remetente from './Remetente'

import { useEffect, useState } from 'react'
import $ from 'jquery'
import 'jquery-mask-plugin'


const fields = {
  "remetente": [
    {
      id: 'remetente_nome',
      label: 'Nome',
      type: 'text',
      placeholder: 'Nome do Remetente',
      required: true,
      className: '',
      validation: '',
    },
    {
      id: 'remetente_cpf_cnpj',
      label: 'CPF/CNPJ',
      type: 'text',
      placeholder: 'CPF ou CNPJ do Remetente',
      required: true,
      className: '',
      validation: '',
    },
    {
      id: 'remetente_endereco',
      label: 'Endereço',
      type: 'text',
      placeholder: 'Endereço do Remetente',
      required: true,
      className: '',
      validation: '',
    },
    {
      id: 'remetente_cep',
      label: 'CEP',
      type: 'text',
      placeholder: 'CEP do Remetente',
      required: true,
      className: '',
      validation: '',
    },
    {
      id: 'remetente_cidade_uf',
      label: 'Cidade/UF',
      type: 'text',
      placeholder: 'Cidade/UF do Remetente',
      required: true,
      className: '',
      validation: '',
    },
  ],

  "destinatario": [
    {
      id: 'destinatario_nome',
      label: 'Nome',
      type: 'text',
      placeholder: 'Nome do Destinatário',
      required: true,
      className: '',
      validation: '',
    },
    {
      id: 'destinatario_cpf_cnpj',
      label: 'CPF/CNPJ',
      type: 'text',
      placeholder: 'CPF ou CNPJ do Destinatário',
      required: true,
      className: '',
      validation: '',
    },
    {
      id: 'destinatario_endereco',
      label: 'Endereço',
      type: 'text',
      placeholder: 'Endereço do Destinatário',
      required: true,
      className: '',
      validation: '',
    },
    {
      id: 'destinatario_cep',
      label: 'CEP',
      type: 'text',
      placeholder: 'CEP do Destinatário',
      required: true,
      className: '',
      validation: '',
    },
    {
      id: 'destinatario_cidade_uf',
      label: 'Cidade/UF',
      type: 'text',
      placeholder: 'Cidade/UF do Destinatário',
      required: true,
      className: '',
      validation: '',
    }
  ],

  "conteudo_descricao": [
    {
      id: 'conteudo_descricao_1',
      label: 'Descrição do Conteúdo',
      type: 'text',
      placeholder: 'Descrição do Conteúdo',
      required: true,
      className: '',
      validation: '',
    },
    {
      id: 'conteudo_quantidade_1',
      label: 'Quantidade',
      type: 'number',
      placeholder: 'Quantidade do Conteúdo',
      required: true,
      className: '',
      validation: '',
    },
    {
      id: 'conteudo_valor_1',
      label: 'Valor (R$)',
      type: 'number',
      placeholder: 'Valor do Conteúdo',
      required: true,
      className: '',
      validation: '',
    },
    {
      id: 'conteudo_peso_1',
      label: 'Peso (Kg)',
      type: 'number',
      placeholder: 'Peso do Conteúdo',
      required: true,
      className: '',
      validation: '',
    },
  ]
}

function App() {
  const [data, setData] = useState(new Date().toISOString().split('T')[0])

  const handleSubmit = (e) => {
    e.preventDefault()
    window.print()
  }

  const handleLabelForm = () => {
    // Usar pdfmake para gerar o PDF

    const xxx = `
    Rementente:
    Nome: ${''}
    CPF/CNPJ: ${''}
    Endereço: ${''}
    CEP: ${''}
    Cidade/UF: ${''}

    Destinatário:
    Nome: ${''}
    CPF/CNPJ: ${''}
    Endereço: ${''}
    CEP: ${''}
    Cidade/UF: ${''}
    `
  }

  // TODO - Implementar a validação da data
  useEffect(() => {
    // Add. validação de data
    // $('#data_assinatura').mask('00/00/0000')
  })

  return (
    <>
      <div className="container">
        <h1>Declaração de Conteúdo</h1>
        <form action='#' method='POST '>
          <table>
            <tbody>
              <Remetente fields={fields.remetente} />
              <Destinatario fields={fields.destinatario} />
              <Conteudo fields={fields.conteudo_descricao} />

              <tr>
                <th colSpan="4">Declaração</th>
              </tr>
              <tr>
                <td colSpan="4">
                  Declaro que não me enquadro no conceito de contribuinte previsto no art. 4º da Lei Complementar nº 87/1996, uma vez que não realizo, com habitualidade ou em volume que caracterize intuito comercial, operações de circulação de mercadoria, ainda que se iniciem no exterior, ou estou dispensado da emissão da nota fiscal por força da legislação tributária vigente, responsabilizando-me, nos termos da lei e a quem de direito, por
                  informações inverídicas. <br /><br />
                  Declaro ainda que não estou postando conteúdo inflamável, explosivo, causador de combustão espontânea, tóxico, corrosivo, gás ou qualquer outro conteúdo que conste na lista de proibições e restrições disponível no site dos Correios: <a href="https://www.correios.com.br/enviar/proibicoes-e-restricoes/proibicoes-e-restricoes" target='_blank' rel='noreferrer noopener'>https://www.correios.com.br/enviar/proibicoes-e-restricoes/proibicoes-e-restricoes</a>.
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <label htmlFor="assinatura_remetente">Assinatura do Remetente: </label>
                  <input type="text" id="assinatura_remetente" readOnly disabled /></td>
                <td colSpan="2">
                  <label htmlFor='data_assinatura'>Data:</label>
                  <input type="date" id="data_assinatura" value={data} onChange={(e) => setData(e.target.value)} required />
                  {/* <input type="text" id="data_assinatura" value={data} onChange={(e) => setData(e.target.value)} required /> */}
                </td>
              </tr>
              <tr className='no-print'>
                <td colSpan="2"><button className='btn' type='submit' onClick={handleSubmit}>Imprimir</button></td>
                <td colSpan="2"><button className='btn btn-secondary' type='button'>Gerar etiqueta</button></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </>
  )
}

export default App
