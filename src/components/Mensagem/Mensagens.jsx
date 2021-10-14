import { Box } from '@material-ui/core';
import React, { useContext } from 'react';
import { Store } from '../../store/Store';
import Mensagem from './Mensagem';

const Mensagens = () => {
  const { state } = useContext(Store);
  const { mensagens } = state;

  console.log(state);
  return (
    <Box display="block" height="100%">
      {mensagens.map((mensagem, i) => (
        <Mensagem key={i} {...mensagem} />
      ))}
    </Box>
  );
};

export default Mensagens;
