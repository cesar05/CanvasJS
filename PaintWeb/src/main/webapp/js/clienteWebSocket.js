/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var wsUri="ws://"+document.location.host+
                  document.location.pathname+
                  "paintweb";
       
var websocket=new WebSocket(wsUri);
var msj=document.getElementById("msj");

websocket.onmessage=function(evt){    
    dibujarOtrosClientes(JSON.parse(evt.data));
};

websocket.onopen=function(evt){
    msj.innerHTML="Conectado a : "+wsUri;
};
websocket.onerror=function(evt){
    msj.innerHTML='<span style="color:red;">ERROR:</span>'+evt.data;
};
function sendData(json){
    websocket.send(json);
}