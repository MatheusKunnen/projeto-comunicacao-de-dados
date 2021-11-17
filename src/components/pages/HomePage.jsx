import React, { useContext } from 'react';
import { Store } from '../../store/Store';

import { Box, Typography, Button, Divider } from '@material-ui/core';
import { Storage, ContactPhone } from '@material-ui/icons';

import useMainStyles from '../../styles/useMainStyles';
import { Link } from 'react-router-dom';
import CommConfig from '../Config/CommConfig';
import AuthConfig from '../Config/AuthConfig';
import Encriptador from '../../comm/Encriptador';

const HomePage = () => {
  const classes = useMainStyles();
  const { state } = useContext(Store);
  const disabled =
    state.commConfig.host.length <= 0 ||
    isNaN(state.commConfig.porta) ||
    state.commConfig.porta > 65535 ||
    !Encriptador.validateConfigString(state.encriptadorConfig.cString);
  return (
    <Box className={classes.homePageRoot}>
      <Typography className={classes.pageTitle}>Grupo Socket</Typography>
      <Divider />
      <HomeButton
        disabled={disabled}
        component={Link}
        to="/servidor"
        icon={<Storage className={classes.homePageBtnImg} />}
        label="Iniciar Servidor"
      />
      <HomeButton
        disabled={disabled}
        component={Link}
        to="/cliente"
        icon={<ContactPhone className={classes.homePageBtnImg} />}
        label="Iniciar Cliente"
      />
      <Divider />
      <Box display="flex" justifyContent="space-between">
        <CommConfig />
        <AuthConfig />
      </Box>
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
