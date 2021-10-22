import React, { useState, useContext } from 'react';
import { Box, Input, Button } from '@material-ui/core';
import { Store } from '../../store/Store';
import { enviarMensagemAction } from '../../store/Actions';

const MensagemInput = ({ ...props }) => {
  const [mensagem, setMensagem] = useState(
    'O pé de Zé tem o que mesmo ? [{,;}]'
  );
  const { state, dispatch } = useContext(Store);
  const enviarMensagem = enviarMensagemAction(state, dispatch);

  const handleInputChange = (e) => {
    if (e && e.target) setMensagem(e.target.value);
  };

  const handleSendClick = () => {
    if (mensagem.length <= 0) return;
    enviarMensagem(mensagem);
  };

  return (
    <Box display="flex" paddingLeft="1rem" {...props}>
      <Input
        value={mensagem}
        onChange={handleInputChange}
        placeholder="Escreva sua mensagem..."
        style={{ flexGrow: '2' }}
      />
      <Button
        onClick={handleSendClick}
        disabled={mensagem.length <= 0}
        color="primary"
      >
        Enviar
      </Button>
    </Box>
  );
};

export default MensagemInput;
