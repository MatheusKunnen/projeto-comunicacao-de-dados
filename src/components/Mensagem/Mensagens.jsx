import React, { useContext } from 'react';
import { Box } from '@material-ui/core';
import { Store } from '../../store/Store';
import Mensagem from './Mensagem';

const Mensagens = () => {
  const { state } = useContext(Store);
  const { mensagens } = state;

  return (
    <Box display="block" height="100%" overflow="scroll">
      {mensagens.map((mensagem, i) => (
        <Mensagem key={i} {...mensagem} />
      ))}
    </Box>
  );
};

export default Mensagens;
