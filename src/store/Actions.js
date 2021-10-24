import Codificador from '../comm/Codificador';
import Comunicador from '../comm/Comunicador';
import Encriptador from '../comm/Encriptador';
import crypto from 'crypto';
import {
  ON_ENVIAR_MENSAGEM_ERROR,
  ON_LIMPAR_MENSAGEM_ERROR,
  ON_INICIAR_SERVIDOR,
  ON_FECHAR_SERVIDOR,
  ON_CONECTAR_CLIENTE,
  ON_FECHAR_CLIENTE,
  ON_ADICIONAR_MENSAGEM_RECEBIDA,
} from './types';

export const enviarMensagemAction = (state, dispatch) => (mensagem) => {
  // Encripta mensagem
  const encrypted = Encriptador.encrypt(state.encriptadorConfig, mensagem);
  // Converte caracteres em binario (UNICAMENTE para DEBUG)
  // const bin = Codificador.string2bin(encrypted);
  // Codifica utilizando o algoritmo de codigo de linha
  const coded = Codificador.encoder(encrypted);
  // Calcula hash da mensagem para identificar
  // const id = crypto.createHash('md5').update(coded).digest('hex');
  if (state.cliente && state.cliente.isRunning) {
    state.cliente.write(coded);
  } else {
    //Envia objeto da mensagem para o estado
    dispatch({
      type: ON_ENVIAR_MENSAGEM_ERROR,
      payload: {
        msg: 'Nao foi possivel enviar a mensagem',
      },
    });
  }
};

export const limparMensagemEnviadaAction = (state, dispatch) => () => {
  // Verifica que exista um ID valido
  if (typeof id === 'undefined') return;
  dispatch({
    type: ON_LIMPAR_MENSAGEM_ERROR,
    payload: null,
  });
};

export const adicionarMensagemRecebidaAction =
  (state, dispatch) => (msgCodificada) => {
    // console.log(msgCodificada);
    // Decodifica a mensagem utilizando o algoritmo de codigo de linha
    const decoded = Codificador.decoder(msgCodificada);
    // Desencripta a mensagem
    const decrypted = Encriptador.encrypt(state.encriptadorConfig, decoded);
    // Calcula o eequivalente em binario da mensagem
    const bin = Codificador.string2bin(decoded);
    // Calcula hash da mensagem para identificar
    const id = crypto.createHash('md5').update(msgCodificada).digest('hex');
    const dataBin = bin.split('');
    let idx = 0;
    const dataSinal = msgCodificada
      .replace(/\D/g, '')
      .split('')
      .map((d, i) => {
        if (i > 0 && i % 2 === 0 && idx + 1 < dataBin.length) idx += 1;
        return { coded: d, bin: dataBin[idx] };
      });
    // Adiciona a mensagem a lista de mensagens recebidas
    dispatch({
      type: ON_ADICIONAR_MENSAGEM_RECEBIDA,
      payload: {
        id,
        txtOriginal: decrypted,
        txtCrypto: decoded,
        txtBin: bin,
        txtCoded: msgCodificada,
        dataSinal,
      },
    });
  };

export const iniciarServidorAction = (state, dispatch) => (callback) => {
  const servidor = Comunicador.criarServidor(
    state.commConfig.host,
    state.commConfig.porta,
    callback
  );
  if (servidor) {
    dispatch({ type: ON_INICIAR_SERVIDOR, payload: servidor });
  }
};

export const fecharServidorAction = (state, dispatch) => () => {
  if (state.servidor !== null) state.servidor.close();
  dispatch({ type: ON_FECHAR_SERVIDOR, payload: null });
};

export const iniciarClienteAction = (state, dispatch) => (callback) => {
  const cliente = Comunicador.connectarServidor(
    state.commConfig.host,
    state.commConfig.porta,
    callback
  );
  if (cliente) {
    dispatch({ type: ON_CONECTAR_CLIENTE, payload: cliente });
  }
};

export const fecharClienteAction = (state, dispatch) => () => {
  if (state.cliente !== null) state.cliente.close();
  dispatch({ type: ON_FECHAR_CLIENTE, payload: null });
};
