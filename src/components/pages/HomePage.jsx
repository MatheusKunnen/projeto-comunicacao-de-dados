import React from 'react';

import { Box, Typography, Button, Divider } from '@material-ui/core';
import { Storage, ContactPhone } from '@material-ui/icons';

import useMainStyles from '../../styles/useMainStyles';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const classes = useMainStyles();
  return (
    <Box className={classes.homePageRoot}>
      <Typography className={classes.pageTitle}>Grupo Socket</Typography>
      <Divider />
      <HomeButton
        component={Link}
        to="/servidor"
        icon={<Storage className={classes.homePageBtnImg} />}
        label="Iniciar Servidor"
      />
      <HomeButton
        component={Link}
        to="/cliente"
        icon={<ContactPhone className={classes.homePageBtnImg} />}
        label="Iniciar Cliente"
      />
      <Divider />
    </Box>
  );
};

const HomeButton = ({ icon, label, ...props }) => {
  return (
    <Button color="primary" {...props}>
      <Box display="flex" alignItems="center">
        {icon}
        <Typography>{label}</Typography>
      </Box>
    </Button>
  );
};

export default HomePage;
