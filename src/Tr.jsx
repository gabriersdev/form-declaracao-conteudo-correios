import $ from 'jquery';
import 'jquery-mask-plugin';
import { useEffect, useState, useRef } from 'react';
import PropType from 'prop-types';

const Tr = ({ id }) => {
  const [dimensions, setDimensions] = useState({ height: '29px' });
  const textareaRef = useRef(null);
  const [text, setText] = useState('');

  useEffect(() => {
    $(`#conteudo_valor_${id}`).mask('###.###.##0,00', { reverse: true });

    const updateDimensions = () => {
      if (textareaRef.current) {
        setDimensions({
          height: (textareaRef.current.scrollHeight >= 29 ? textareaRef.current.scrollHeight : 29) + 'px'
        });
      }
    };

    updateDimensions(); // Define as dimensões iniciais

    window.addEventListener('input', updateDimensions);

    // Limpa o event listener ao desmontar o componente
    return () => window.removeEventListener('input', updateDimensions);
  }, [id])


  return (
    <tr key={id}>
      <td>{id}</td>
      <td><textarea type="text" id={`conteudo_descricao_${id}`} size={text.length} rows={1} value={text} style={{ height: dimensions.height }} ref={textareaRef} onChange={(e) => setText(e.target.value)}></textarea></td>
      <td><input type="number" step="0.01" id={`conteudo_quantidade_${id}`} min="1" /></td>
      <td><input type="text" id={`conteudo_valor_${id}`} /></td>
    </tr >
  )
}

Tr.propTypes = {
  id: PropType.number.isRequired
}

export default Tr;