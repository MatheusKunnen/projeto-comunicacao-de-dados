import React, { useContext } from 'react';
import { Store } from '../../store/Store';

import { Box, Typography } from '@material-ui/core';

const ClienteStatus = ({ ...props }) => {
  const { state } = useContext(Store);
  const { commConfig, encriptadorConfig } = state;
  const { host, porta } = commConfig;
  const { cString } = encriptadorConfig;

  const available = state.cliente !== null;
  const connected = available && state.cliente.isRunning();

  let label = `${connected ? 'Conectado' : 'No conectado'} (${host}:${porta}) `;

  return (
    <Box
      {...props}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      style={{ background: connected ? '#01ff1f' : '#FF4162' }}
    >
      <Typography>{label}</Typography>
      <Typography>{`<Enigma> ${cString}`}</Typography>
    </Box>
  );
};

export default ClienteStatus;
