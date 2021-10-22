import React from 'react';

import { Box, Typography } from '@material-ui/core';

const Mensagem = ({
  id,
  txtOriginal,
  txtCrypto,
  txtBin,
  txtCoded,
  ...props
}) => {
  const items = [id, txtOriginal, txtCrypto, txtBin, txtCoded];
  return (
    <Box
      display="flex"
      flexDirection="column"
      padding="0.5rem"
      margin="0.5rem"
      style={{ background: '#EEE' }}
      {...props}
    >
      {items.map((item, i) => (
        <Typography
          key={`${id}-${i}`}
          style={{ width: '100%', textOverflow: 'wrap' }}
        >
          {String(item)}
        </Typography>
      ))}
    </Box>
  );
};

export default Mensagem;
