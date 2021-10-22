const net = window.require('net');

const PORTA_DEFAULT = 5100;
const HOST_DEFAULT = 'localhost';
const dummy = (data) => console.log(data);

const criarServidor = (
  host = HOST_DEFAULT,
  porta = PORTA_DEFAULT,
  callback = dummy
) => {
  let socket = null;
  let running = false;
  const server = net.createServer(function (s) {
    console.log(`Socket ${host}:${porta} iniciado`);
    socket = s;
    running = true;
    // Controla eventos
    socket.on('data', (data) => {
      // console.log(data.toString('utf-8'));
      // Envia informação para o callback
      callback(data);
      socket.write(data);
    });
    socket.on('close', () => {
      running = false;
      console.log(`Socket ${host}:${porta} fechado.`);
    });
    socket.on('error', function (err) {
      console.error(`ERROR: ${err}`);
      console.error(new Error().stack);
    });
    // Faz broadcast de toda informação recebida.
    // socket.pipe(socket);
  });

  // Inicia servidor
  server.listen(porta, host);

  const close = () => {
    if (socket !== null) socket.close();
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
  callback = dummy
) => {
  var client = new net.Socket();
  let running = false;

  client.connect(porta, host, function () {
    console.log('Connected');
    running = true;
    // client.write('Hello, server! Love, Client.');
  });

  client.on('data', function (data) {
    // console.log('Received: ' + data);
    callback(data);
    //client.destroy(); // kill client after server's response
  });

  client.on('close', function () {
    console.log('Connection closed');
    running = false;
  });

  const close = () => {
    running = false;
    client.destroy();
  };

  const isRunning = () => running;

  const write = (msg) => {
    client.write(`${msg}\n`);
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
