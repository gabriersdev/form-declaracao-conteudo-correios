import Tr from "./Tr";

import $ from 'jquery';
import 'jquery-mask-plugin';
import { useEffect } from 'react';

const Conteudo = () => {
  useEffect(() => {
    $('#conteudo_valor_total').mask('###.###.##0,00', { reverse: true });
    $('#conteudo_peso_total').mask('##0,000', { reverse: true });
  }, [])

  return (
    <>
      <tr>
        <th colSpan="4" className="text-center">Identificação dos Bens</th>
      </tr>
      <tr>
        <th>Item</th>
        <th>Conteúdo</th>
        <th>Quant.</th>
        <th>Valor (R$)</th>
      </tr >

      {
        [...Array(3).keys()].map((i) => {
          return <Tr id={i + 1} key={i + 1}></Tr>
        })
      }

      <tr>
        <td colSpan="2" style={{ textAlign: 'right' }}>Totais</td>
        <td><input type="number" min={1} id="conteudo_quantidade_total" /></td>
        <td><input type="text" id="conteudo_valor_total" /></td>
      </tr>

      <tr>
        <td colSpan="2" style={{ textAlign: 'right' }}>Peso total (kg)</td>
        <td colSpan="2"><input type="text" id="conteudo_peso_total" /></td>
      </tr>
    </>
  )
}

export default Conteudo;