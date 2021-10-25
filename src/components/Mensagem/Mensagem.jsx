import React, { useState } from 'react';

import { Box, Typography, Button } from '@material-ui/core';
import { Info, ArrowDownward, ChevronRight } from '@material-ui/icons';
import MensagemSignal from './MensagemSignal';
const Mensagem = ({
  id,
  txtOriginal,
  txtCrypto,
  txtBin,
  txtCoded,
  dataSinal,
  ...props
}) => {
  const [show, setShow] = useState(false);
  let items = [txtOriginal];
  if (show) items = [...items, txtCrypto /*txtBin, txtCoded*/];
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
          maxWidth="90%"
        >
          {items.map((item, i) => (
            <Typography key={`${id}-${i}`} style={{ wordWrap: 'break-word' }}>
              {String(item)}
            </Typography>
          ))}
          <MensagemSignal
            data={dataSinal}
            chartHeight={show ? 50 : 25}
            chartLengthMultiplier={show ? 14 : 7}
            className={show ? 'custom-h-scroll-bar' : 'no-scroll'}
            showBin={show}
            showClock={show}
          />
          <Typography style={{ fontSize: '0.75rem', color: '#333' }}>
            {id}
          </Typography>
        </Box>
        <Box display="flex">
          <Button onClick={() => setShow(!show)}>
            {!show ? <ChevronRight /> : <ArrowDownward />}
          </Button>
          {/* <Button>
            <Info />
          </Button> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Mensagem;
