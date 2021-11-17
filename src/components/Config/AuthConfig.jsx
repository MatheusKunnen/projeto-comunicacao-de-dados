import React, { useContext } from 'react';
import { Store } from '../../store/Store';
import { Box, TextField } from '@material-ui/core';
import { updateEncriptadorConfigAction } from '../../store/Actions';
import Encriptador from '../../comm/Encriptador';
const AuthConfig = ({ readOnly, ...props }) => {
  const { state, dispatch } = useContext(Store);
  const updateEncriptadorConfig = updateEncriptadorConfigAction(
    state,
    dispatch
  );
  const { encriptadorConfig } = state;

  const error = !Encriptador.validateConfigString(encriptadorConfig.cString);

  const handleInputUpdate = (e) => {
    if (e.target && e.target.name)
      updateEncriptadorConfig({
        ...encriptadorConfig,
        [e.target.name]: e.target.value,
      });
  };
  return (
    <Box {...props} display="flex" justifyContent="center" padding="1rem">
      <TextField
        name="cString"
        label="Key Encriptador"
        placeholder={'ACB ABC 999 AABBCCDDEEFF'}
        error={error}
        InputProps={{
          readOnly,
        }}
        value={encriptadorConfig?.cString}
        onChange={handleInputUpdate}
        style={{ minWidth: '30rem' }}
      />
    </Box>
  );
};

AuthConfig.defaultProps = {
  readOnly: false,
};

export default AuthConfig;
