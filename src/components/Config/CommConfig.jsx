import React, { useContext } from 'react';
import { Store } from '../../store/Store';
import { Box, TextField } from '@material-ui/core';
import { updateCommConfigAction } from '../../store/Actions';

const CommConfig = ({ readOnly, ...props }) => {
  const { state, dispatch } = useContext(Store);
  const updateCommConfig = updateCommConfigAction(state, dispatch);
  const { commConfig } = state;

  const hostError = commConfig.host.length <= 0;
  const portaError =
    isNaN(commConfig.porta) || Number(commConfig.porta) > 65535;

  const handleInputUpdate = (e) => {
    if (e.target && e.target.name)
      updateCommConfig({
        ...commConfig,
        [e.target.name]: e.target.value,
      });
  };
  return (
    <Box {...props} display="flex" justifyContent="center" padding="1rem">
      <TextField
        name="host"
        label="Host Servidor"
        error={hostError}
        InputProps={{
          readOnly,
        }}
        value={commConfig?.host}
        onChange={handleInputUpdate}
      />
      <TextField
        name="porta"
        type="number"
        label="Porta"
        error={portaError}
        InputProps={{
          readOnly,
        }}
        value={commConfig?.porta}
        onChange={handleInputUpdate}
        style={{ width: '5rem' }}
      />
    </Box>
  );
};

CommConfig.defaultProps = {
  readOnly: false,
};

export default CommConfig;
