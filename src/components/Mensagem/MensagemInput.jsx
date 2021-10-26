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
    setMensagem('');
  };

  return (
    <Box
      display="flex"
      padding="1rem"
      boxShadow={1}
      style={{ background: '#FFF' }}
      {...props}
    >
      <Input
        value={mensagem}
        onChange={handleInputChange}
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleSendClick();
        }}
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
