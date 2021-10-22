import React, { createContext, useReducer } from 'react';
import {
  ON_ENVIAR_MENSAGEM_ERROR,
  ON_LIMPAR_MENSAGEM_ERROR,
  ON_INICIAR_SERVIDOR,
  ON_FECHAR_SERVIDOR,
  ON_CONECTAR_CLIENTE,
  ON_FECHAR_CLIENTE,
  ON_ADICIONAR_MENSAGEM_RECEBIDA,
} from './types';

const initialState = {
  mensagens: [],
  mensagensPendentes: [],
  servidor: null,
  cliente: null,
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
        // mensagensPendentes: [...state.mensagensPendentes, action.payload],
        // mensagens: [action.payload, ...state.mensagens],
      };
    case ON_LIMPAR_MENSAGEM_ERROR:
      return {
        ...state,
        // mensagensPendentes: state.mensagens.filter(
        //   (msg) => msg.id === action.payload
        // ),
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
