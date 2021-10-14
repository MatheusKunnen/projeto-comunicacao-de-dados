const net = window.require('net');

const PORTA_DEFAULT = 5100;
const HOST_DEFAULT = 'localhost';
const dummy = (data) => console.log(data);

const criarServidor = (host = HOST_DEFAULT, porta = PORTA_DEFAULT , callback = dummy) => {
  let socket = null;
  const server = net.createServer(function(s) {
    socket = s;
    // Controla eventos
    socket.on('data', (data)=>{
      console.log(data.toString('utf-8'));
      // Envia informação para o callback
      callback(data);
    });
    socket.on('close', ()=>{
      console.log(`Socket ${host}:${porta} fechado.`)
    });
    socket.on('error', function(err) {
      console.error(`ERROR: ${err}`);
      console.error(new Error().stack);
  });
    // Faz broadcast de toda informação recebida.
    socket.pipe(socket);
  });
  
  // Inicia servidor
  server.listen(porta, host);

  const close = () => {

  }

  return {
    close
  }
}

const connectarServidor = (host = HOST_DEFAULT, porta = PORTA_DEFAULT, callback = dummy) => {
  
  const close = () => {

  }

  return {
    close
  }
}

const Comunicador = {
  criarServidor,
  connectarServidor,
}

export default Comunicador;