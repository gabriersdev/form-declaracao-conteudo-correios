import './App.css'
import Conteudo from './Conteudo'
import Destinatario from './Destinatario'
import Remetente from './Remetente'

import pdfMake from 'pdfmake/build/pdfmake.js';

pdfMake.fonts = {
  // download default Roboto font from cdnjs.com
  Roboto: {
    normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
    bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
    italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
    bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
  },
}

// TODO - Implementar useContext para passar os campos para outros componentes
import { useState, createContext } from 'react'
import Util from './Util';

export const ThemeContext = createContext(null)

const fields = {
  "remetente": [
    {
      id: 'remetente_nome',
      label: 'Nome',
      type: 'text',
      placeholder: 'Nome do Remetente',
      value: '',
      required: true,
      className: '',
      validation: '',
    },
    {
      id: 'remetente_cpf_cnpj',
      label: 'CPF/CNPJ',
      type: 'text',
      placeholder: 'CPF ou CNPJ do Remetente',
      value: '',
      required: true,
      className: '',
      validation: '',
    },
    {
      id: 'remetente_endereco',
      label: 'Endereço',
      type: 'text',
      placeholder: 'Endereço do Remetente',
      value: '',
      required: true,
      className: '',
      validation: '',
    },
    {
      id: 'remetente_cep',
      label: 'CEP',
      type: 'text',
      placeholder: 'CEP do Remetente',
      value: '',
      required: true,
      className: '',
      validation: '',
    },
    {
      id: 'remetente_cidade_uf',
      label: 'Cidade/UF',
      type: 'text',
      placeholder: 'Cidade/UF do Remetente',
      value: '',
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
      value: '',
      required: true,
      className: '',
      validation: '',
    },
    {
      id: 'destinatario_cpf_cnpj',
      label: 'CPF/CNPJ',
      type: 'text',
      placeholder: 'CPF ou CNPJ do Destinatário',
      value: '',
      required: true,
      className: '',
      validation: '',
    },
    {
      id: 'destinatario_endereco',
      label: 'Endereço',
      type: 'text',
      placeholder: 'Endereço do Destinatário',
      value: '',
      required: true,
      className: '',
      validation: '',
    },
    {
      id: 'destinatario_cep',
      label: 'CEP',
      type: 'text',
      placeholder: 'CEP do Destinatário',
      value: '',
      required: true,
      className: '',
      validation: '',
    },
    {
      id: 'destinatario_cidade_uf',
      label: 'Cidade/UF',
      type: 'text',
      placeholder: 'Cidade/UF do Destinatário',
      value: '',
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

  const validityForm = (e) => {
    if (Array.from(e.target.closest('form').querySelectorAll('input')).filter((input) => input.required == true && input.value.trim().length == 0).length === 0) {
      e.preventDefault()
      return true
    } else if (Array.from(e.target.closest('form').querySelectorAll(':user-invalid'))) {
      if (Array.from(e.target.closest('form').querySelectorAll(':user-invalid')).lenght > 0) {
        Array.from(e.target.closest('form').querySelectorAll(':user-invalid'))[0].focus()
        alert('Existe 1 ou mais campos preenchidos incorretamente')
        return false
      }
    }
    return false
  }

  const handleSubmit = (e) => {
    if (validityForm(e)) window.print()
  }

  const handleLabelForm = (e) => {
    // Necessário verificar se campos estão OK
    // Usar pdfmake para gerar o PDF
    if (!validityForm(e)) return

    // Gerar PDF
    pdfMake.createPdf({
      content: [
        {
          text: 'Etiqueta de Postagem',
          style: 'header'
        },
        {
          text: 'Remetente',
          style: 'subheader'
        },
        {
          table: {
            body: [
              [{ text: 'NOME', bold: true }, { text: 'CPF/CNPJ', bold: true }],
              [fields.remetente[0].value.toUpperCase().trim(), new Util().stringMask('verify', fields.remetente[1].value.toUpperCase().trim())],
              [{ text: 'ENDEREÇO REMETENTE', bold: true }, { text: 'CEP', bold: true }],
              [`${fields.remetente[2].value.toUpperCase().trim()} - CIDADE/UF: ${fields.remetente[4].value.toUpperCase().trim()}`, new Util().stringMask('cep', fields.remetente[3].value.toUpperCase().trim())],
            ]
          },
          style: 'table'
        },
        {
          text: 'Destinatário',
          style: 'subheader'
        },
        {
          table: {
            body: [
              [{ text: 'NOME', bold: true }, { text: 'CPF/CNPJ', bold: true }],
              [fields.destinatario[0].value.toUpperCase().trim(), new Util().stringMask('verify', fields.destinatario[1].value.toUpperCase().trim())],
              [{ text: 'ENDEREÇO DESTINO', bold: true }, { text: 'CEP', bold: true }],
              [`${fields.destinatario[2].value.toUpperCase().trim()} - CIDADE/UF: ${fields.destinatario[4].value.toUpperCase().trim()}`, new Util().stringMask('cep', fields.destinatario[3].value.toUpperCase().trim())],
            ]
          },
        }
      ],

      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 5]
        },
        table: {
          margin: [0, 5, 0, 0]
        },
      },

      defaultStyle: {
        font: 'Roboto',
        fontSize: 14,
        bold: false
      }
    }).open()
  }

  return (
    <>
      <div className="container">
        <h1>Declaração de Conteúdo</h1>
        <span className='no-print' style={{ marginBottom: '1rem', display: 'block' }}>* Preenchimento obrigatório</span>
        <form action='#' method='POST '>
          <table>
            <tbody>
              <ThemeContext.Provider value={fields}>
                <Remetente fields={fields.remetente} />
                <Destinatario fields={fields.destinatario} />
                <Conteudo fields={fields.conteudo_descricao} />
              </ThemeContext.Provider>

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
                </td>
              </tr>
              <tr className='no-print'>
                <td colSpan="2"><button className='btn' type='submit' onClick={handleSubmit}>Imprimir</button></td>
                <td colSpan="2"><button className='btn btn-secondary' type='submit' onClick={handleLabelForm}>Gerar etiqueta</button></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </>
  )
}

export default App
