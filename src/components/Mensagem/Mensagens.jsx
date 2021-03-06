import React, { useContext } from 'react';
import { Box } from '@material-ui/core';
import { Store } from '../../store/Store';
import Mensagem from './Mensagem';

const Mensagens = () => {
  const { state } = useContext(Store);
  const { mensagens } = state;

  return (
    <Box
      display="block"
      height="100%"
      width="100%"
      overflow="scroll"
      className="no-scroll"
    >
      {mensagens.map((mensagem, i) => (
        <Mensagem key={mensagem.id} {...mensagem} />
      ))}
    </Box>
  );
};

export default Mensagens;
