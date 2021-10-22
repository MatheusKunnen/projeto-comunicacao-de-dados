import React, { useState } from 'react';

import { Box, Typography, Button } from '@material-ui/core';
import { Info, ArrowDownward, ChevronRight } from '@material-ui/icons';
const Mensagem = ({
  id,
  txtOriginal,
  txtCrypto,
  txtBin,
  txtCoded,
  ...props
}) => {
  const [show, setShow] = useState(false);
  let items = [txtOriginal];
  if (show) items = [...items, txtCrypto, txtBin, txtCoded];
  return (
    <Box width="100%">
      <Box
        display="flex"
        flexDirection="row"
        margin="0.5rem"
        style={{
          background: '#FFF',
          justifyContent: 'space-between',
        }}
        boxShadow="2"
        borderRadius={4}
        {...props}
      >
        <Box
          display="flex"
          flexDirection="column"
          padding="0.5rem"
          maxWidth="80%"
        >
          {items.map((item, i) => (
            <Typography key={`${id}-${i}`} style={{ wordWrap: 'break-word' }}>
              {String(item)}
            </Typography>
          ))}
          <Typography style={{ fontSize: '0.75rem', color: '#333' }}>
            {id}
          </Typography>
        </Box>
        <Box display="flex">
          <Button onClick={() => setShow(!show)}>
            {!show ? <ChevronRight /> : <ArrowDownward />}
          </Button>
          <Button>
            <Info />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Mensagem;
