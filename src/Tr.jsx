import $ from 'jquery';
import 'jquery-mask-plugin';
import { useEffect, useState, useRef } from 'react';

const Tr = ({ id }) => {
  const [dimensions, setDimensions] = useState({ height: 'initial' });
  const textareaRef = useRef(null);
  const [text, setText] = useState('');

  useEffect(() => {
    $(`#conteudo_valor_${id}`).mask('###.###.##0,00', { reverse: true });

    const updateDimensions = () => {
      if (textareaRef.current) {
        setDimensions({
          height: textareaRef.current.scrollHeight + 'px'
        });
        console.log(textareaRef.current.scrollHeight);
      }
    };

    updateDimensions(); // Define as dimensões iniciais

    window.addEventListener('input', updateDimensions);

    // Limpa o event listener ao desmontar o componente
    return () => window.removeEventListener('input', updateDimensions);
  }, [])


  return (
    <tr key={id}>
      <td>{id}</td>
      <td><textarea type="text" id={`conteudo_descricao_${id}`} size={text.length} rows={1} value={text} style={{ height: dimensions.height }} ref={textareaRef} onChange={(e) => setText(e.target.value)}></textarea></td>
      <td><input type="number" step="0.01" id={`conteudo_quantidade_${id}`} min="1" /></td>
      <td><input type="text" id={`conteudo_valor_${id}`} /></td>
    </tr >
  )
}

export default Tr;