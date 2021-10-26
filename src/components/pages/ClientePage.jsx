import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Button, Typography, Divider } from '@material-ui/core';
import { ArrowBack, ContactPhone } from '@material-ui/icons';

import Cliente from '../Cliente';

import useMainStyles from '../../styles/useMainStyles';
import ClienteStatus from '../Cliente/ClienteStatus';

const ClientePage = () => {
  const classes = useMainStyles();
  return (
    <Box className={classes.clientePageRoot}>
      <Box
        display="flex"
        justifyContent="stretch"
        style={{ background: '#FFF' }}
      >
        <Button component={Link} to="/" color="primary">
          <ArrowBack />
        </Button>
        <Typography className={classes.pageTitle}>
          <ContactPhone /> Cliente
        </Typography>
        <Divider />
      </Box>
      <Cliente />

      <ClienteStatus />
    </Box>
  );
};

export default ClientePage;
