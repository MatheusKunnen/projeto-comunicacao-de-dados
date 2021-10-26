import React, { useContext } from 'react';
import { Store } from '../../store/Store';

import { Box, Typography } from '@material-ui/core';

const ClienteStatus = ({ ...props }) => {
  const { state } = useContext(Store);
  const { commConfig } = state;
  const { host, porta } = commConfig;

  const available = state.cliente !== null;
  const connected = available && state.cliente.isRunning();

  let label = `${connected ? 'Conectado' : 'No conectado'} (${host}:${porta})`;

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

export default ClienteStatus;
