import React, { createContext, useReducer } from 'react';
import {
  ON_ENVIAR_MENSAGEM_ERROR,
  ON_LIMPAR_MENSAGEM_ERROR,
  ON_INICIAR_SERVIDOR,
  ON_FECHAR_SERVIDOR,
  ON_CONECTAR_CLIENTE,
  ON_FECHAR_CLIENTE,
  ON_ADICIONAR_MENSAGEM_RECEBIDA,
  ON_UPDATE_COMM_CONFIG,
  ON_UPDATE_CRYPTO_CONFIG,
  ON_CLIENTE_STATUS_CHANGE,
  ON_SERVIDOR_STATUS_CHANGE,
} from './types';

const initialState = {
  mensagens: [],
  error: null,
  servidor: null,
  servidorStatus: false,
  cliente: null,
  clienteStatus: false,
  commConfig: {
    host: 'localhost',
    porta: 5150,
  },
  encriptadorConfig: {},
};

export const Store = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case ON_ENVIAR_MENSAGEM_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ON_LIMPAR_MENSAGEM_ERROR:
      return {
        ...state,
        error: null,
      };
    case ON_ADICIONAR_MENSAGEM_RECEBIDA:
      return {
        ...state,
        mensagens: [action.payload, ...state.mensagens],
      };
    case ON_INICIAR_SERVIDOR:
      return { ...state, servidor: action.payload };
    case ON_FECHAR_SERVIDOR:
      return { ...state, servidor: null };
    case ON_CONECTAR_CLIENTE:
      return { ...state, cliente: action.payload };
    case ON_FECHAR_CLIENTE:
      return { ...state, cliente: null };
    case ON_UPDATE_CRYPTO_CONFIG:
      return { ...state, encriptadorConfig: action.payload };
    case ON_UPDATE_COMM_CONFIG:
      return { ...state, commConfig: action.payload };
    case ON_CLIENTE_STATUS_CHANGE:
      return { ...state, clienteStatus: action.payload };
    case ON_SERVIDOR_STATUS_CHANGE:
      return { ...state, servidorStatus: action.payload };
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
