/*
  Codifica a string utilizando o código de linha Manchester Diferencial
  (Deve transformar os caracteres utilizando a tabela ascii estendida)
*/
/*const encode = (msg) => {
  return msg;
}*/
function encoder(mensagem) {
 //PREPARAÇÃO PARA ENCODER   
    //convertendo o código para decimal segundo a tabela ASCii
    let codigo_asc=[];
    for(let i=0; i<mensagem.length;i++){
        codigo_asc[i]=mensagem[i].charCodeAt();
    }
    
    //convertendo o código decimal para binário
    let codigo_binario=[];
    for(let i=0; i<codigo_asc.length;i++){
        codigo_binario[i]=codigo_asc[i].toString(2);
    }

    //formando uma única string binária
    let codigo_stringBinaria="";
    for(let i=0; i<codigo_binario.length; i++){
        codigo_stringBinaria+=codigo_binario[i];
    }

//APLICANDO MANCHESTER DIFERENCIAL
    let codificado = "";
    let ultimo_code = "";

    //tratando caso inicial
    if(codigo_stringBinaria[0]=== "1"){
        codificado = "10";
        ultimo_code = "10";
    }
    else if (codigo_stringBinaria[0]=== "0"){
        codificado = "01";
        ultimo_code = "01";
    }
    //aplicando encoder
    for(let i=1; i<codigo_stringBinaria.length; i++){
        
        if((ultimo_code === "10") && (codigo_stringBinaria[i]==="0")){
            codificado += "10";
            ultimo_code = "10";
        }
        else if((ultimo_code === "10") && (codigo_stringBinaria[i]==="1")){
            codificado += "01";
            ultimo_code = "01";
        }
        else if((ultimo_code === "01") && (codigo_stringBinaria[i]==="0")){
            codificado += "01";
            ultimo_code = "01";
        }
        else if((ultimo_code === "01") && (codigo_stringBinaria[i]==="1")){
            codificado += "10";
            ultimo_code = "10";
        }
    }
    //retorna encoder
    return codificado;
}

/*
  Decodifica a string utilizando o código de linha Manchester Diferencial
  (Deve transformar os caracteres utilizando a tabela ascii estendida)
*/
const decode = (msg) => {
  return msg;
}

const Codificador = {
  encode,
  decode,
}

export default Codificador;