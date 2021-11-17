import React, { useContext } from 'react';
import { Store } from '../../store/Store';

import { Box, Typography } from '@material-ui/core';

const ServidorStatus = ({ ...props }) => {
  const { state } = useContext(Store);
  const { commConfig, encriptadorConfig } = state;
  const { porta } = commConfig;
  const { cString } = encriptadorConfig;

  const available = state.servidor !== null;
  const connected = available && state.servidor.isRunning();

  let label = `${connected ? 'Disponível' : 'Não disponível'} Porta:${porta} `;

  return (
    <Box
      {...props}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      style={{ background: connected ? '#01ff1f' : '#FF4162' }}
    >
      <Typography>{label}</Typography>
      <Typography>{`<Enigma> ${cString}`}</Typography>
    </Box>
  );
};

export default ServidorStatus;
