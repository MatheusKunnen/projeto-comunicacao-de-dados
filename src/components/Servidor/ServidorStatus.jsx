import React, { useContext } from 'react';
import { Store } from '../../store/Store';

import { Box, Typography } from '@material-ui/core';

const ServidorStatus = ({ ...props }) => {
  const { state } = useContext(Store);
  const { commConfig } = state;
  const { porta } = commConfig;

  const available = state.servidor !== null;
  const connected = available && state.servidor.isRunning();

  let label = `${connected ? 'Disponível' : 'Não disponível'} Porta:${porta}`;

  return (
    <Box
      {...props}
      display="flex"
      justifyContent="center"
      style={{ background: connected ? '#01ff1f' : '#FF4162' }}
    >
      <Typography>{label}</Typography>
    </Box>
  );
};

export default ServidorStatus;
