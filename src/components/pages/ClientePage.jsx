import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Button, Typography, Divider } from '@material-ui/core';
import { ContactPhone } from '@material-ui/icons';

import Cliente from '../Cliente';

import useMainStyles from '../../styles/useMainStyles';

const ClientePage = () => {
  const classes = useMainStyles();
  return (
    <Box className={classes.clientePageRoot}>
      <Box>
        <Typography className={classes.pageTitle}>
          <ContactPhone /> Cliente
        </Typography>
        <Divider />
      </Box>
      <Cliente />
      <Button component={Link} to="/" color="danger">
        Voltar
      </Button>
    </Box>
  );
};

export default ClientePage;
