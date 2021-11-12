/*
  @Desc: Módulo encarregado de encriptar e desencriptar os strings
  @Parâmetros:
    - config: segredos/informação para encriptar/desencriptar (falta definir algoritmo)
*/

//config[0] = keysettings
//config[1] = ringsettings
//config[2] = rotorsettings (números de 1 a 8)
//config[3] = plugboardsettings
//EX: config = ['bÇ!','$@5','247','POMLIUKJNHYTGBVFREDC'];

const encrypt = (config, msg) => {

  // verifica possíveis erros nos parâmetros
  if(msg.length < 1){ return; }    
  if(config[0].length !== 3){ return; }
  if(config[1].length !== 3){ return; }
  if(config[3].length % 2 !== 0){ return; }
  if(config[2].length !== 3){ return; }
  
  // interpreta as rotorsettings (strings 1-8 to int 0-7)
  let rotors = config[2].split("");
  rotors[0]=rotors[0].valueOf()-1;rotors[1]=rotors[1].valueOf()-1;rotors[2]=rotors[2].valueOf()-1; 
  
  // analisa as configurações do plugboard e guarda ele como uma key para substituição simples
  let plugboard = "";
  for(let i = 0; i<256;i++){
      plugboard += String.fromCharCode(i);
  }
  let parr = plugboard.split("");

  let i = 0, j = 1; 
  let ichar = 0, jchar = 0; 
  let temp = "";

  for(i=0,j=1;i<config[3].length;i+=2,j+=2){
    ichar = plugboard.indexOf(config[3].charAt(i));
    jchar = plugboard.indexOf(config[3].charAt(j));
    temp = parr[jchar]; parr[jchar]=parr[ichar]; parr[ichar]=temp;
  }
  plugboard = parr.join("");
  
  // interpreta as keysettings e ringsettings (transforma de letra para número)
  let key = "";
  let ring = "";
  key=config[0].split("");
  key[0]=key[0].charCodeAt(0); key[1]=key[1].charCodeAt(0); key[2]=key[2].charCodeAt(0);
  ring=config[1].split("");
  ring[0]=ring[0].charCodeAt(0); ring[1]=ring[1].charCodeAt(0); ring[2]=ring[2].charCodeAt(0);
  
  // codifica a mensagem usando a criptografia enigma
  let ciphertext = "", ch = "";   
  for(i=0; i < msg.length; i++){
      ch=msg.charAt(i);
      key=increment_settings(key,rotors);
      ciphertext = ciphertext + enigma(ch,key,rotors,ring,plugboard);
  }
  return ciphertext;
}

const enigma = (ch,key,rotors,ring,plugboard) => {
// aplica a transformação do plugboard
  ch = simplesub(ch,plugboard);
// aplica as transformação inversas do rotores da direita para esquerda
  ch = rotor(ch,rotors[2],key[2]-ring[2]);
  ch = rotor(ch,rotors[1],key[1]-ring[1]);
  ch = rotor(ch,rotors[0],key[0]-ring[0]);
// aplica uma substituição usando o refletor
  let reflector = [237,100,57,138,133,16,114,35,97,28,136,13,36,11,187,105,5,89,150,186,90,108,58,26,202,113,23,124,9,177,162,129,180,207,116,7,12,137,130,195,81,140,73,59,118,98,208,192,67,92,144,248,201,184,151,70,181,2,22,43,218,252,242,160,174,122,225,48,69,68,55,159,74,42,72,163,251,198,126,148,210,40,236,209,204,132,141,119,221,17,20,101,49,213,194,158,191,8,45,185,1,91,139,154,168,15,226,214,21,190,232,234,222,25,6,199,34,167,44,87,156,125,65,145,27,121,78,228,166,31,38,246,85,4,250,135,10,37,3,102,41,86,169,189,50,123,235,182,79,227,18,54,178,173,103,243,120,161,95,71,63,157,30,75,164,254,128,117,104,142,176,206,203,153,64,215,170,29,152,211,32,56,147,231,53,99,19,14,239,143,109,96,47,255,94,39,219,205,77,115,240,52,24,172,84,197,171,33,46,83,80,179,223,93,107,175,238,247,60,196,245,88,112,212,229,66,106,149,127,224,244,183,110,249,111,146,82,0,216,188,200,241,62,155,230,220,131,217,51,233,134,76,61,253,165,193];
  ch = String.fromCharCode(reflector[ch.charCodeAt(0)]);
// aplica as transformação inversas do rotores da esquerda para a direita
  ch = rotor(ch,rotors[0]+8,key[0]-ring[0]);
  ch = rotor(ch,rotors[1]+8,key[1]-ring[1]);
  ch = rotor(ch,rotors[2]+8,key[2]-ring[2]);
// aplica novamente a transformação do plugboard
  ch = simplesub(ch,plugboard);
  return ch;
}


const increment_settings = (key,r) => {
  // O vetor notch armazena as posições para qual um rotor faz girar o rotor à sua esquerda
  let notch = [[68,124],[4,210],[21,54],[81,73],[60,78],[95,216],[224,15],[45,12]]; //coloquei um notch aleatório, não sei se seria o ideal
  if(key[1] === notch[r[1]][0] || key[1] === notch[r[1]][1]){
      key[0] = (key[0]+1)%256;
      key[1] = (key[1]+1)%256;
  }    
  if(key[2] === notch[r[2]][0] || key[2] === notch[r[2]][1]){
      key[1] = (key[1]+1)%256;
  }
  key[2] = (key[2]+1)%256;   
  return key;
}

// executa uma substituição simples
const simplesub = (ch,key) => {
return key.charAt(ch.charCodeAt(0));
}

const rotor = (ch,r,offset) => {
  // As primeiras oito strings são as substituições dos rotores I à VIII. As 8 seguintes são as substituições inversas
  let key = [[174,32,125,66,65,101,58,118,196,142,219,139,202,25,140,41,166,213,43,207,75,170,195,70,95,226,228,12,23,96,178,192,38,2,220,137,31,229,189,193,185,88,103,61,146,36,109,208,18,14,180,8,50,183,15,154,20,77,187,132,136,115,143,24,138,201,74,232,89,236,108,255,10,72,248,107,113,230,188,197,240,237,4,45,160,84,252,91,97,86,161,112,177,233,242,179,204,11,222,241,37,135,191,216,40,156,60,110,168,246,28,163,21,71,76,243,152,6,186,182,206,106,249,82,211,127,62,79,130,67,121,171,104,27,126,73,30,105,17,98,120,221,212,16,119,49,157,165,218,184,52,33,90,29,210,9,46,155,54,13,148,1,141,253,63,238,147,245,26,47,159,100,203,215,158,194,176,254,87,209,128,48,42,114,57,44,162,239,199,129,235,34,123,55,145,149,172,144,205,35,225,68,227,173,69,164,81,223,224,3,116,150,244,78,247,85,83,124,92,122,39,214,59,64,175,181,80,93,117,51,56,198,99,200,217,250,133,167,153,7,234,134,5,169,111,19,190,151,0,94,53,251,102,22,131,231],
  [240,87,66,112,226,42,75,36,178,249,157,198,232,73,107,117,202,192,102,137,152,69,170,181,147,55,29,244,237,59,45,70,120,51,195,161,60,47,133,134,196,38,201,76,151,39,25,34,245,219,94,221,228,26,52,54,225,143,115,35,4,189,96,213,233,248,207,10,135,171,209,180,197,99,49,153,131,83,252,204,149,205,62,227,164,61,13,98,224,188,187,124,194,129,243,125,103,78,130,238,193,72,27,3,12,14,88,86,128,176,90,111,15,0,2,211,114,41,28,63,68,159,77,155,183,145,177,174,44,110,136,141,191,223,50,43,53,186,222,203,1,92,80,74,208,167,100,89,11,108,146,93,32,20,242,17,142,234,241,230,79,105,48,231,64,251,190,220,162,7,175,185,166,104,165,97,95,150,253,65,123,218,160,106,21,5,184,246,163,23,215,85,212,9,217,250,138,101,236,173,33,121,91,67,31,182,139,210,16,140,30,126,199,239,127,116,56,132,71,109,235,82,57,40,22,24,81,84,172,18,19,168,119,158,58,148,247,229,144,122,206,200,156,113,118,179,169,37,8,216,214,6,154,254,255,46],
  [22,166,216,78,138,162,132,48,248,127,31,155,178,1,86,164,229,144,135,233,230,6,137,17,107,198,246,133,55,131,211,115,142,36,225,66,180,56,202,124,47,108,109,126,34,57,236,157,104,37,239,201,188,255,25,227,97,148,140,174,38,218,243,217,91,46,207,77,116,150,83,121,39,73,145,197,234,81,199,136,122,191,101,82,179,113,8,53,238,18,143,49,96,0,43,74,54,151,12,106,146,159,175,80,210,35,193,9,61,65,112,190,241,70,242,30,186,231,98,19,29,212,42,118,16,169,247,69,45,41,168,237,123,64,184,173,245,87,220,204,213,111,24,219,4,20,14,72,250,52,95,100,215,167,147,62,165,160,208,134,90,10,172,139,232,181,192,75,170,84,224,177,50,251,2,214,88,125,223,3,40,114,28,141,149,130,67,244,254,161,21,27,63,110,102,203,5,156,79,163,240,222,117,154,176,195,58,71,206,128,11,226,23,33,200,44,103,7,209,171,196,153,89,189,26,183,205,187,51,93,152,105,15,249,94,13,158,68,85,129,120,99,76,182,185,235,252,92,228,59,221,253,60,119,194,32],
  [177,207,234,112,235,184,107,253,205,208,138,145,1,168,44,20,7,216,251,94,104,160,12,102,87,244,229,40,125,45,199,59,86,132,28,5,254,187,70,15,163,2,96,110,245,78,243,149,90,248,4,53,172,16,218,152,128,106,247,84,11,236,10,42,228,202,115,49,148,14,156,116,26,143,8,154,220,122,178,13,249,58,232,68,9,191,108,240,237,41,164,185,0,192,56,144,225,22,196,222,114,123,170,153,157,75,166,117,54,61,171,151,66,29,103,95,200,238,67,252,100,146,210,76,113,201,162,197,173,3,50,136,142,246,55,48,99,141,23,47,119,169,35,150,139,24,92,65,182,34,165,215,38,18,57,51,133,212,217,71,69,91,37,25,74,80,43,135,137,227,239,230,98,109,118,255,224,124,190,213,241,198,195,194,221,223,179,97,183,206,81,130,88,82,204,174,120,17,19,126,250,31,52,83,93,111,62,72,27,85,32,147,105,36,89,129,63,60,127,131,140,155,134,188,214,121,167,6,73,181,226,186,180,242,209,176,46,193,161,203,21,159,158,233,39,64,219,30,189,79,77,101,175,211,33,231],
  [249,80,122,53,76,208,94,179,22,233,229,95,236,195,70,61,34,43,15,74,197,207,23,203,114,148,242,54,99,90,75,152,167,6,28,222,7,129,42,55,144,193,241,252,20,82,190,19,136,17,232,135,18,239,226,217,151,3,96,11,132,13,164,194,171,183,44,186,81,112,77,202,1,155,168,228,154,205,12,2,58,246,214,118,71,60,89,223,116,69,243,105,162,221,10,137,36,113,117,119,150,59,153,145,8,86,254,213,204,212,234,188,32,63,220,127,91,216,210,181,240,244,33,0,174,173,131,130,235,177,245,163,49,39,9,64,45,211,73,189,237,40,238,46,143,169,166,26,255,124,180,21,51,29,88,175,56,141,106,140,14,50,160,128,182,93,125,247,85,62,215,110,178,209,25,78,196,103,68,227,149,52,161,224,134,142,147,191,187,92,47,83,176,219,139,146,79,230,126,184,101,251,27,253,72,115,100,102,192,158,185,30,37,5,4,24,38,35,206,108,123,48,16,198,218,57,157,138,84,109,165,67,250,172,107,248,104,199,97,98,225,41,31,201,121,111,159,65,87,200,156,66,231,170,120,133],
  [171,200,8,186,80,86,230,106,7,102,50,184,107,130,141,203,251,57,59,38,248,78,169,3,181,197,119,227,98,1,54,103,180,208,60,214,178,238,140,224,72,66,209,165,84,28,253,146,79,150,117,179,43,56,212,32,2,39,10,37,175,240,52,85,129,195,246,70,25,185,149,152,206,88,23,187,216,77,213,219,112,34,116,45,254,101,138,109,73,124,163,118,235,249,225,36,135,139,125,154,120,172,243,147,44,48,247,74,53,148,156,104,22,226,123,121,158,250,153,131,183,47,242,144,83,196,17,100,136,105,33,237,6,168,113,51,115,19,155,204,222,110,239,114,0,14,76,62,145,15,12,61,182,46,63,94,69,31,16,205,220,173,96,133,30,68,95,202,157,65,111,143,58,41,215,188,26,244,221,92,189,27,174,176,161,137,199,108,193,64,234,11,29,170,151,90,55,67,132,82,167,223,20,97,87,128,177,207,18,21,127,252,218,13,40,217,191,164,5,89,228,236,160,201,35,192,42,126,190,75,210,49,142,4,159,231,245,9,232,71,166,122,233,99,91,229,93,162,198,211,255,194,241,81,134,24],
  [98,213,246,64,90,142,89,95,143,145,122,188,200,211,212,150,71,12,170,104,235,34,244,224,184,135,167,109,123,25,57,138,39,216,251,202,174,91,17,189,101,181,242,164,1,65,218,23,93,158,8,201,44,249,207,226,88,72,230,178,18,248,121,117,175,5,193,7,68,132,37,221,245,69,227,253,105,103,185,94,21,102,127,186,92,22,153,161,80,84,160,252,99,237,30,32,47,205,87,214,46,155,163,0,255,10,198,113,19,55,215,124,28,63,146,33,168,177,81,195,40,48,58,52,128,78,232,35,53,234,180,156,106,60,54,9,27,45,24,250,165,254,166,108,111,220,16,192,231,157,169,42,209,179,6,14,147,194,144,41,131,36,141,59,49,11,125,197,62,183,159,190,67,247,73,182,70,51,203,233,151,76,137,2,31,100,240,86,3,208,191,229,115,129,176,26,236,75,61,243,119,187,162,133,13,20,130,172,112,50,136,196,148,29,114,139,217,120,173,239,116,225,210,134,77,74,82,149,15,107,66,126,206,83,56,38,110,96,154,199,152,43,223,85,79,228,4,241,238,118,97,140,222,219,171,204],
  [77,98,102,206,247,213,198,143,83,135,19,211,140,52,23,108,97,90,43,33,17,153,42,3,151,48,165,24,61,81,244,144,117,173,45,174,134,121,94,112,127,91,141,78,53,161,183,237,47,92,222,220,178,208,228,109,1,68,125,203,50,82,243,122,239,99,59,34,142,185,113,69,7,175,41,202,200,166,204,219,51,180,188,9,181,49,138,44,80,195,160,0,30,104,240,249,146,133,101,163,39,79,187,84,4,106,171,14,150,58,131,221,26,238,54,148,190,16,192,15,72,8,233,85,170,31,158,105,70,5,149,29,248,145,64,10,66,162,212,230,164,110,86,236,189,197,245,65,55,116,25,128,176,205,87,227,152,251,234,32,214,241,242,229,74,139,73,21,196,254,157,12,137,215,115,38,126,223,155,56,156,2,218,118,250,37,159,114,71,88,235,100,191,225,120,63,231,28,40,182,167,93,124,107,60,6,207,232,11,132,46,111,57,168,179,154,123,194,95,136,76,172,217,147,20,35,252,62,224,184,201,169,177,186,36,67,255,18,103,216,210,199,246,89,253,22,13,129,209,27,130,226,75,193,96,119],
    
  [248,161,33,209,82,242,117,239,51,155,72,97,27,159,49,54,143,138,48,245,56,112,253,28,63,13,168,133,110,153,136,36,1,151,191,199,45,100,32,220,104,15,182,18,185,83,156,169,181,145,52,229,150,250,158,193,230,184,6,222,106,43,126,164,223,4,3,129,201,204,23,113,73,135,66,20,114,57,213,127,226,206,123,216,85,215,89,178,41,68,152,87,218,227,249,24,29,88,139,232,171,5,252,42,132,137,121,75,70,46,107,244,91,76,183,61,210,228,7,144,140,130,219,192,217,2,134,125,180,189,128,254,59,236,241,101,60,35,64,11,14,162,9,62,197,194,44,166,160,195,211,247,116,238,55,157,105,146,174,170,84,90,186,111,205,147,16,237,108,243,21,131,196,203,0,224,176,92,30,95,50,225,119,53,149,40,118,58,78,38,246,102,31,39,175,22,8,79,231,188,233,65,12,172,96,198,120,19,47,179,154,124,142,17,221,173,103,234,148,10,34,141,98,207,208,200,25,202,26,37,77,255,67,93,240,190,69,81,165,187,80,99,94,115,212,167,109,214,74,122,235,251,86,163,177,71],
  [113,140,114,103,60,185,251,169,248,193,67,148,104,86,105,112,208,155,229,230,153,184,224,189,225,46,53,102,118,26,210,204,152,200,47,59,7,247,41,45,223,117,5,135,128,30,255,37,162,74,134,33,54,136,55,25,216,222,234,29,36,85,82,119,164,179,2,203,120,21,31,218,101,13,143,6,43,122,97,160,142,226,221,77,227,191,107,1,106,147,110,202,141,151,50,176,62,175,87,73,146,197,18,96,173,161,183,14,149,219,129,111,3,243,116,58,215,15,244,232,32,201,239,180,91,95,211,214,108,93,98,76,217,38,39,68,130,19,196,206,209,131,156,57,238,125,150,24,235,80,177,44,20,75,252,123,242,10,233,121,182,35,168,188,84,174,172,145,231,246,22,69,228,199,127,170,109,126,8,245,71,23,205,124,186,171,137,90,89,61,166,132,17,100,92,34,40,72,11,212,241,42,16,139,79,81,240,66,144,70,207,115,192,63,250,190,249,194,181,49,167,51,138,133,88,56,4,83,52,237,159,163,12,64,157,220,198,28,99,213,0,158,154,94,27,48,187,236,65,9,195,165,78,178,253,254],
  [93,13,174,179,144,196,21,217,86,107,161,210,98,235,146,232,124,23,89,119,145,190,0,212,142,54,224,191,182,120,115,10,255,213,44,105,33,49,60,72,180,129,122,94,215,128,65,40,7,91,172,228,149,87,96,28,37,45,206,249,252,108,155,192,133,109,35,186,237,127,113,207,147,73,95,167,242,67,3,198,103,77,83,70,169,238,14,137,176,222,160,64,247,229,234,150,92,56,118,241,151,82,194,216,48,231,99,24,41,42,193,141,110,85,181,31,68,202,123,253,240,71,80,132,39,177,43,9,209,239,185,29,6,27,159,18,79,22,4,163,58,183,32,90,17,74,100,154,57,184,69,97,230,221,203,11,197,47,236,101,157,189,5,199,15,156,1,153,130,125,168,219,162,135,59,102,204,171,12,84,36,165,243,225,134,244,116,227,52,223,111,81,166,106,254,205,220,75,25,78,214,51,38,195,139,226,208,66,158,218,104,30,121,140,175,152,2,63,61,143,138,250,201,178,170,34,211,55,248,16,20,117,164,19,76,245,46,131,88,50,200,112,114,62,187,136,26,126,8,233,148,173,246,251,188,53],
  [92,12,41,129,50,35,227,16,74,84,62,60,22,79,69,39,53,197,153,198,15,240,97,138,145,163,72,208,34,113,247,201,210,254,149,142,213,162,152,244,27,89,63,166,14,29,236,139,135,67,130,155,202,51,108,134,94,154,81,31,217,109,206,216,245,147,112,118,83,160,38,159,207,228,164,105,123,250,45,249,165,190,193,203,59,209,32,24,192,214,48,161,146,204,19,115,42,187,172,136,120,251,23,114,20,212,57,6,86,173,43,205,3,124,100,66,71,107,174,140,196,225,77,101,177,28,199,218,56,215,191,219,33,156,222,167,131,168,10,144,220,137,132,73,95,11,121,211,68,47,143,111,55,103,75,221,70,104,242,241,21,238,126,40,90,150,106,226,13,141,102,110,52,128,195,252,235,0,78,186,232,229,148,188,5,91,231,37,223,248,178,85,93,237,183,182,98,127,181,30,116,125,65,239,194,8,189,1,9,234,122,253,157,179,224,151,17,158,54,246,76,184,99,185,176,96,230,169,64,26,171,255,82,243,2,4,61,88,117,170,87,180,233,46,25,44,133,58,49,80,200,18,119,7,36,175],
  [123,72,79,57,214,213,33,36,104,134,94,59,78,61,160,18,222,49,52,47,44,151,8,22,215,174,147,202,34,153,211,242,112,122,16,217,96,212,216,133,141,241,38,17,66,136,143,190,221,132,161,152,181,3,27,39,156,225,80,101,85,15,169,113,135,247,251,231,178,89,14,84,204,138,19,30,4,70,175,196,1,68,45,191,228,168,105,248,154,86,29,116,189,165,6,11,58,238,239,28,206,200,207,177,236,91,158,234,219,229,171,245,69,97,24,205,88,98,83,99,254,244,2,220,149,166,198,115,163,37,127,126,60,255,184,51,48,95,227,194,159,157,185,144,40,103,195,186,25,180,100,56,31,102,76,73,250,226,209,246,162,182,92,131,62,230,146,32,74,145,253,64,233,125,124,155,192,129,172,7,150,119,164,65,199,210,67,188,111,139,46,187,208,41,63,13,176,20,223,237,249,243,71,23,108,77,218,21,5,173,118,137,109,107,82,170,117,55,224,193,114,93,35,87,183,240,54,179,75,10,197,252,50,9,110,128,12,140,142,53,120,42,26,90,121,130,81,167,235,0,232,201,43,203,106,148],
  [144,29,56,23,233,218,132,8,2,237,58,191,150,213,145,149,158,126,208,137,202,209,112,74,255,68,176,181,45,192,164,157,55,130,81,224,95,59,19,57,214,173,226,52,104,83,153,121,105,231,10,135,62,108,30,196,53,17,172,18,34,151,147,154,189,169,41,197,165,156,67,239,40,88,107,229,146,77,21,48,4,253,199,124,44,63,5,204,73,219,195,244,179,246,155,166,162,203,28,243,127,85,9,31,111,129,7,12,187,87,141,170,80,134,143,136,82,50,91,26,100,115,241,114,89,98,227,210,205,64,13,119,198,163,254,96,128,185,86,97,38,14,232,171,123,148,47,103,109,70,49,194,71,118,99,138,110,168,116,234,222,184,247,90,217,43,240,200,133,22,193,0,101,161,182,60,183,206,36,51,32,24,152,120,11,69,3,75,175,180,228,216,225,188,251,65,125,25,248,186,1,223,167,15,139,159,72,207,33,42,230,249,54,78,35,174,76,215,212,79,160,178,140,201,39,94,113,27,220,245,6,235,238,242,190,92,221,131,37,142,61,252,122,102,177,236,66,106,20,93,117,16,211,46,84,250],
  [103,44,183,188,246,65,154,67,50,135,105,165,17,204,155,228,146,38,60,108,205,80,85,47,138,29,195,136,112,213,94,184,95,115,21,127,161,70,235,32,120,159,151,241,52,137,100,96,121,164,209,177,123,128,134,109,234,30,122,163,133,198,168,113,3,45,230,172,68,73,176,16,57,174,225,197,181,224,125,244,88,118,226,233,89,243,187,98,56,6,4,37,84,48,79,7,237,250,0,92,185,40,81,77,19,76,132,229,143,27,236,144,208,107,214,192,220,63,249,200,217,62,10,28,111,166,231,82,124,193,206,160,69,203,223,25,210,182,31,215,251,162,5,8,158,9,114,156,212,227,15,180,240,86,238,101,131,149,49,170,90,87,202,102,43,140,142,26,116,150,18,254,207,218,36,64,194,117,59,153,130,41,175,169,24,78,83,201,11,39,171,190,147,66,157,119,211,167,106,239,12,51,35,178,255,97,232,54,189,152,222,13,14,1,99,110,33,216,46,253,145,71,252,242,23,221,55,74,245,191,58,148,126,179,129,20,196,93,248,219,186,247,42,199,22,72,2,173,61,53,139,34,91,75,141,104],
  [91,56,181,23,104,129,205,72,121,83,135,208,171,246,107,119,117,20,237,10,224,167,245,14,27,150,112,249,197,131,92,125,159,19,67,225,234,185,175,100,198,74,22,18,87,34,210,48,25,85,60,80,13,44,114,148,179,212,109,66,204,28,227,195,134,147,136,235,57,71,128,188,120,166,164,252,220,0,43,101,88,29,61,8,103,123,142,154,189,243,17,41,49,201,38,218,254,16,1,65,191,98,2,238,93,127,105,203,15,55,141,211,39,70,187,174,149,32,183,255,194,37,63,216,202,58,176,40,151,247,250,110,209,97,36,9,219,172,86,165,12,42,68,7,31,133,96,223,115,130,108,24,156,21,215,178,180,170,126,186,90,45,137,99,140,26,77,200,213,231,124,106,221,33,35,73,152,232,52,214,81,84,199,46,229,69,233,102,82,144,116,192,118,253,217,89,168,145,6,241,76,230,75,59,78,153,3,206,53,248,240,11,138,5,160,173,239,222,182,79,51,111,50,177,228,193,251,155,54,163,139,196,207,122,158,190,143,47,113,64,94,161,162,62,30,146,242,4,132,95,184,157,226,244,169,236]];

  let chcode = (ch.charCodeAt(0)+256+offset)%256;
  let mapch = ( key[r][chcode]+256-offset)%256;
  return String.fromCharCode(mapch);
}

const Encriptador = {
  encrypt,
  enigma,
  increment_settings,
  simplesub,
  rotor,
};

export default Encriptador;
