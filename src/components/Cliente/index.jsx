import React, { Fragment, useEffect, useContext } from 'react';
import { Store } from '../../store/Store';
import {
  iniciarClienteAction,
  iniciarServidorAction,
  adicionarMensagemRecebidaAction,
  updateClienteStatusAction,
} from '../../store/Actions';

import Mensagens from '../Mensagem/Mensagens';
import MensagemInput from '../Mensagem/MensagemInput';

const Cliente = () => {
  const { state, dispatch } = useContext(Store);

  const iniciarCliente = iniciarClienteAction(state, dispatch);
  const iniciarServidor = iniciarServidorAction(state, dispatch);
  const updateClienteStatus = updateClienteStatusAction(state, dispatch);

  const adicionarMensagemRecebida = adicionarMensagemRecebidaAction(
    state,
    dispatch
  );
  const servidorCallback = (data) => {
    // adicionarMensagemRecebida(data.toString('utf-8'));
  };
  const clienteCallback = (data) => {
    adicionarMensagemRecebida(data.toString('utf-8'));
  };

  useEffect(() => {
    const servidor = iniciarServidor(servidorCallback);
    const cliente = iniciarCliente(clienteCallback, updateClienteStatus);
    return () => {
      servidor.close();
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

export default Cliente;
