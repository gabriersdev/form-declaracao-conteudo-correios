import $ from 'jquery';
import 'jquery-mask-plugin';
import { useEffect } from 'react';

const Tr = ({ id }) => {
  useEffect(() => {
    $(`#conteudo_valor_${id}`).mask('###.###.##0,00', { reverse: true });
  }, [])

  return (
    <tr key={id}>
      <td>{id}</td>
      <td><input type="text" id={`conteudo_descricao_${id}`} /></td>
      <td><input type="number" step="0.01" id={`conteudo_quantidade_${id}`} min="1" /></td>
      <td><input type="text" id={`conteudo_valor_${id}`} /></td>
    </tr>
  )
}

export default Tr;