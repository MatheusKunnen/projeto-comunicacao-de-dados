import React, { createContext, useReducer } from 'react';

const initialState = {
  mensagens: [
    {
      txtOriginal: 'Test: Mensagem 1 (txtOriginal)',
      txtCrypto: 'Mensagem 1 (txtCrypto)',
      txtBin: 'Mensagem 1 (txtBin)',
      txtCoded: 'Mensagem 1 (txtCoded)',
    },
    {
      txtOriginal: 'Test: Mensagem 2 (txtOriginal)',
      txtCrypto: 'Mensagem 2 (txtCrypto)',
      txtBin: 'Mensagem 2 (txtBin)',
      txtCoded: 'Mensagem 2 (txtCoded)',
    },
  ],
  commConfig: {
    host: 'localhost',
    porta: 5150,
  },
  encriptadorConfig: {},
};

export const Store = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};
