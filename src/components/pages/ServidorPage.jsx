import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Button, Divider, Typography } from '@material-ui/core';
import { ArrowBack, Storage } from '@material-ui/icons';

import useMainStyles from '../../styles/useMainStyles';
import Servidor from '../Servidor';
import ServidorStatus from '../Servidor/ServidorStatus';

const ServidorPage = () => {
  const classes = useMainStyles();
  return (
    <Box className={classes.servidorPageRoot}>
      <Box
        display="flex"
        justifyContent="stretch"
        boxShadow={1}
        style={{ background: '#FFF' }}
      >
        <Button component={Link} to="/" color="primary">
          <ArrowBack />
        </Button>
        <Typography className={classes.pageTitle}>
          <Storage /> Servidor
        </Typography>
      </Box>
      <Servidor />
      <ServidorStatus />
    </Box>
  );
};

export default ServidorPage;
