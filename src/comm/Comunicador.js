const net = window.require('net');

const PORTA_DEFAULT = 5100;
const HOST_DEFAULT = 'localhost';
const dummy = (data) => {}; //console.log(data);

const criarServidor = (
  host = HOST_DEFAULT,
  porta = PORTA_DEFAULT,
  callback = dummy,
  statusChangeCallback = dummy
) => {
  let socket = null;
  let running = false;
  statusChangeCallback(running);
  const server = net.createServer(function (s) {
    console.log(`Socket ${host}:${porta} iniciado`);
    socket = s;
    running = true;
    statusChangeCallback(running);
    // Controla eventos
    socket.on('data', (data) => {
      // Envia informação para o callback
      callback(data);
      socket.write(data);
    });
    socket.on('close', () => {
      running = false;
      statusChangeCallback(running);
      console.log(`Socket ${host}:${porta} fechado.`);
    });
    socket.on('error', function (err) {
      console.error(`ERROR: ${err}`);
      running = false;
      socket.destroy();
      statusChangeCallback(running);
    });
    socket.resume();
  });
  server.on('error', function (err) {
    console.error(`ERROR: ${err}`);
    // console.error(new Error().stack);
    running = false;
    socket.destroy();
    statusChangeCallback(running);
  });
  try {
    // Inicia servidor
    server.listen(porta);
  } catch (err) {
    console.error(err);
  }

  const close = () => {
    console.log('Fechando Servidor..');
    running = false;
    statusChangeCallback(false);
    server.close();
  };
  const isRunning = () => running;

  return {
    close,
    isRunning,
  };
};

const connectarServidor = (
  host = HOST_DEFAULT,
  porta = PORTA_DEFAULT,
  callback = dummy,
  statusChangeCallback = dummy
) => {
  var client = new net.Socket();

  let running = false;
  client.setNoDelay(true);

  client.on('data', function (data) {
    callback(data);
  });

  client.on('close', function () {
    console.log('Conexão fechada');
    running = false;
    statusChangeCallback(running);
  });
  client.setTimeout(3000);
  client.connect({ port: porta, host }, function () {
    console.log('Conectado');
    running = true;
    statusChangeCallback(running);
  });

  const close = () => {
    console.log('Fechando Cliente..');
    running = false;
    statusChangeCallback(running);
    client.destroy();
  };

  const isRunning = () => running;

  const write = (msg) => {
    client.write(`${msg}\r\n`);
  };
  return {
    close,
    isRunning,
    write,
  };
};

const Comunicador = {
  criarServidor,
  connectarServidor,
};

export default Comunicador;
