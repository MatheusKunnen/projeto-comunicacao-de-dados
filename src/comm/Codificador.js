/*
  Codifica a string utilizando o código de linha Manchester Diferencial
  (Deve transformar os caracteres utilizando a tabela ascii estendida)
*/
/*const encode = (msg) => {
  return msg;
}*/

function encoder(mensagem) {
  //PREPARAÇÃO PARA ENCODER

  let codigo_asc = [];
  let codigo_binario = [];
  let codigo_stringBinaria = '';

  for (let i = 0; i < mensagem.length; i++) {
    codigo_asc[i] = mensagem[i].charCodeAt(); //converte a mensagem para decimal
    codigo_binario[i] = codigo_asc[i].toString(2); //convertendo o código decimal para binário
    while (codigo_binario[i].length < 9) {
      //ajuste para todos os números terem a mesma quantidade de casas numéricas
      codigo_binario[i] = '0' + codigo_binario[i];
    }
    codigo_stringBinaria += codigo_binario[i]; //formando uma única string binária
  }

  //APLICANDO MANCHESTER DIFERENCIAL
  let codificado = '';
  let ultimo_code = '';

  //tratando caso inicial
  if (codigo_stringBinaria[0] === '1') {
    codificado = '10';
    ultimo_code = '10';
  } else if (codigo_stringBinaria[0] === '0') {
    codificado = '01';
    ultimo_code = '01';
  }
  //aplicando encoder geral
  for (let i = 1; i < codigo_stringBinaria.length; i++) {
    if (ultimo_code === '10' && codigo_stringBinaria[i] === '0') {
      codificado += '10';
      ultimo_code = '10';
    } else if (ultimo_code === '10' && codigo_stringBinaria[i] === '1') {
      codificado += '01';
      ultimo_code = '01';
    } else if (ultimo_code === '01' && codigo_stringBinaria[i] === '0') {
      codificado += '01';
      ultimo_code = '01';
    } else if (ultimo_code === '01' && codigo_stringBinaria[i] === '1') {
      codificado += '10';
      ultimo_code = '10';
    }
  }
  //retorna encoder
  return codificado;
}

/*
  Decodifica a string utilizando o código de linha Manchester Diferencial
  (Deve transformar os caracteres utilizando a tabela ascii estendida)
*/
/*
const decode = (msg) => {
  return msg;
}*/

function decoder(mensagem_codificada) {
  let decode = '';
  let ultimo = '';
  //REVERTENDO A CODIFICAÇÃO DE MANCHESTER DIFERENCIAL
  if (mensagem_codificada[0] + mensagem_codificada[1] === '10') {
    decode += '1';
    ultimo = '10';
  } else if (mensagem_codificada[0] + mensagem_codificada[1] === '01') {
    decode += '0';
    ultimo = '01';
  }

  for (let i = 2; i < mensagem_codificada.length - 1; i = i + 2) {
    if (ultimo === '10' && mensagem_codificada[i] === '0') {
      decode += '1';
      ultimo = '01';
    } else if (ultimo === '01' && mensagem_codificada[i] === '0') {
      decode += '0';
      ultimo = '01';
    } else if (ultimo === '10' && mensagem_codificada[i] === '1') {
      decode += '0';
      ultimo = '10';
    } else if (ultimo === '01' && mensagem_codificada[i] === '1') {
      decode += '1';
      ultimo = '10';
    }
  }

  // TRANSFORMANDO O CÓDIGO BINÁRIO EM STRING N

  let codigo_asc_binario = [];
  let aux_asc_binario = '';
  let i = 0;

  //separando a string de 9 em 9 algarismos(que representam cada letra)
  for (let j = 0; j < decode.length; j = j + 9) {
    for (let k = 0; k < 9; k++) {
      aux_asc_binario += decode[j + k];
    }

    codigo_asc_binario[i] = aux_asc_binario;
    aux_asc_binario = '';
    i++;
  }

  //convertendo o codigo ascii binário para mensagem inicial
  let codigo_asc_decimal = [];
  let final_Decode = '';

  for (i = 0; i < codigo_asc_binario.length; i++) {
    codigo_asc_decimal[i] = parseInt(codigo_asc_binario[i], 2);
    final_Decode += String.fromCharCode(codigo_asc_decimal[i]);
  }
  //retorna mensagem original
  return final_Decode;
}

const string2bin = (txt) => {
  let codigo_asc = [];
  let codigo_binario = [];
  let codigo_stringBinaria = '';

  for (let i = 0; i < txt.length; i++) {
    codigo_asc[i] = txt[i].charCodeAt(); //converte a txt para decimal
    codigo_binario[i] = codigo_asc[i].toString(2); //convertendo o código decimal para binário
    while (codigo_binario[i].length < 9) {
      //ajuste para todos os números terem a mesma quantidade de casas numéricas
      codigo_binario[i] = '0' + codigo_binario[i];
    }
    codigo_stringBinaria += codigo_binario[i]; //formando uma única string binária
  }
  return codigo_stringBinaria;
};

const Codificador = {
  encoder,
  decoder,
  string2bin,
};

export default Codificador;
