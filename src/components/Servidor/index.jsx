import React, { Fragment, useEffect, useContext } from 'react';
import { Store } from '../../store/Store';
import {
  iniciarClienteAction,
  iniciarServidorAction,
  adicionarMensagemRecebidaAction,
  updateServidorStatusAction,
} from '../../store/Actions';

import Mensagens from '../Mensagem/Mensagens';
import MensagemInput from '../Mensagem/MensagemInput';

const Servidor = () => {
  const { state, dispatch } = useContext(Store);
  const iniciarCliente = iniciarClienteAction(state, dispatch);
  const iniciarServidor = iniciarServidorAction(state, dispatch);
  const adicionarMensagemRecebida = adicionarMensagemRecebidaAction(
    state,
    dispatch
  );
  const updateServidorStatus = updateServidorStatusAction(state, dispatch);
  const servidorCallback = (data) => {
    adicionarMensagemRecebida(data.toString('utf-8'));
  };

  useEffect(() => {
    const server = iniciarServidor(servidorCallback, updateServidorStatus);
    const cliente = iniciarCliente(
      (data) => {
        // console.log(data);
      },
      () => {}
    );
    return () => {
      server.close();
      cliente.close();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Mensagens />
      <MensagemInput />
    </Fragment>
  );
};

export default Servidor;
