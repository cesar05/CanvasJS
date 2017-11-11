/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Crea la ruta a conectarse por websocket
var wsUri="ws://"+document.location.host+
                  document.location.pathname+
                  "paintweb";

//Instancia de objeto websocket
var websocket=new WebSocket(wsUri);

//Referencia al elemento html que va mostrar los mensajes
var msj=document.getElementById("msj");

/**
 * Metodo que recibe los datos y ejecuta la accion que se indica en estos
 * @param {type} evt informacion que llega del server
 * @returns {undefined}
 */
websocket.onmessage=function(evt){
    var json=JSON.parse(evt.data);
    if(json.iniDibujarOtroCliente!==undefined && json.iniDibujarOtroCliente===true){
        iniDibujarOtroCliente(json);
    }
    else if(json.finDibujarOtroCliente!==undefined && json.finDibujarOtroCliente===true){
        finDibujarOtroCliente();
    }
    else if(json.accion!==undefined){ 
        if(json.accion==="dibujar"){
            dibujarOtrosClientes(json);
        }
        else if(json.accion==="borrar"){
            borrarDibujoOtroCliente(json);
        }        
    }
    
};

/**
 * Abre la conexion con el websocket
 * @param {type} evt datos de session websocket que se creo
 * @returns {undefined}
 */
websocket.onopen=function(evt){
    msj.innerHTML="Conectado a : "+wsUri;
};

/**
 * Muestra un error en caso de que se pierda la conexion con el server
 * @param {type} evt datos de session websocket que se creo
 * @returns {undefined}
 */
websocket.onerror=function(evt){
    msj.innerHTML='<span style="color:red;">ERROR:</span>'+evt.data;
};

/**
 * Envia los datos al server
 * @param {type} json datos que se envian al server
 * @returns {undefined}
 */
function sendData(json){
    websocket.send(json);
}
