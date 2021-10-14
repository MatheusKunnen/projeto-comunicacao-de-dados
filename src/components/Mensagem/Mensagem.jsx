import React from 'react';

import { Box, Typography } from '@material-ui/core';

const Mensagem = ({ txtOriginal, txtCrypto, txtBin, txtCoded, ...props }) => {
  const items = [txtOriginal, txtCrypto, txtBin, txtCoded];
  return (
    <Box
      display="flex"
      flexDirection="column"
      padding="0.5rem"
      margin="0.5rem"
      style={{ background: '#EEE' }}
      {...props}
    >
      {items.map((item) => (
        <Typography key={item}>{String(item)}</Typography>
      ))}
    </Box>
  );
};

export default Mensagem;
