import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Button, Typography } from '@material-ui/core';
import { Storage } from '@material-ui/icons';

import useMainStyles from '../../styles/useMainStyles';

const ServidorPage = () => {
  const classes = useMainStyles();
  return (
    <Box className={classes.servidorPageRoot}>
      <Typography className={classes.pageTitle}>
        <Storage /> Servidor
      </Typography>
      <Button component={Link} to="/">
        Voltar
      </Button>
    </Box>
  );
};

export default ServidorPage;
