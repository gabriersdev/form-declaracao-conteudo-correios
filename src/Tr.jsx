const Tr = ({ id }) => {
  return (
    <tr key={id}>
      <td>{id}</td>
      <td><input type="text" id={`conteudo_descricao_${id}`} /></td>
      <td><input type="number" id={`conteudo_quantidade_${id}`} min="1" /></td>
      <td><input type="number" step="0.01" id={`conteudo_valor_${id}`} min="0" /></td>
    </tr>
  )
}

export default Tr;