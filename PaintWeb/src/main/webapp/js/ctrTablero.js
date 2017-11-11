/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Referencia al elemto canvas creado en el html
var tablero=document.getElementById("tablero");

//Referencia al contexto 2d del canvas para dibujar.
var ctx=tablero.getContext("2d");

//Color por default que tendra incialmente el lapiz
var color="#000";

//Tamaño por default que tendra inicialmente el lapiz
var tam="2";

//Indica si el usuario puede realizar alguna accion sobre el tablero
var swithDibujar=false;

//Accion a ejecutar en el tablero ("dibujar" o "borrar")
var swithAccion="";

//Asigna el color por default al contexto 2d del canvas
ctx.fillStyle=color;

/**
 * Realiza la accion indica en el tablero
 * @param {type} event datos del evento ejecutado
 * @returns {undefined}
 */
tablero.onmousemove=function(event){
    if(!this.swithDibujar)return;
    if(swithAccion==="dibujar"){
        dibujar(event.clientX,event.clientY);
    }
    else if(swithAccion==="borrar"){
        borrarDibujo(event.clientX,event.clientY);
    }
};

/**
 * Habilita el cursor para ejecutar alguna accion en el tablero
 * @param {type} event datos del evento ejecutado
 * @returns {undefined}
 */
tablero.onmousedown=function(event){
    this.swithDibujar=true;
    var x=event.clientX;
    var y=event.clientY;
    //Iniciar el dibujo
    ctx.beginPath();
    ctx.moveTo(x,y);
    //Notificar inicio de dibujo
    sendData(JSON.stringify({
        "iniDibujarOtroCliente":true,
        "coords":{"x":x,"y":y}
    }));
};

/**
 * Deshabilita el cursor para no seguir ejecutando alguna accion y envia la notificacion al server
 * @param {type} event datos del evento ejecutado
 * @returns {undefined}
 */
tablero.onmouseup=function(event){
    this.swithDibujar=false;
    //Notificar fin de dibujo
    sendData(JSON.stringify({
        "finDibujarOtroCliente":true
    }));
    //Finalizar Dibujo
    ctx.closePath();
};

/**
 * Dibuja en las coordenas indicadas por el usuario
 * @param {type} x coordenada en el eje horizontal
 * @param {type} y coordenada en el eje vertical
 * @returns {undefined}
 */
function dibujar(x,y){
    ctx.strokeStyle=this.color;
    ctx.lineWidth=this.tam;
    ctx.lineTo(x,y);
    ctx.stroke(); // Lo transforma en dibujo a línea.
    sendData(JSON.stringify({
        "accion":"dibujar",
        "color":this.color,
        "tam":this.tam,
        "coords":{
            "x":x,
            "y":y
        }
    }));
}

//inicio de dibujo otro usuario
function iniDibujarOtroCliente(json){
    ctx.beginPath();
    ctx.moveTo(json.coords.x,json.coords.y);
}
//fin de dibujo otro usuario
function finDibujarOtroCliente(){
    ctx.closePath();
}

/**
 * Dibuja la parte del tablero que se indica en el parametro
 * @param {type} json datos de la accion que se debe ejecutar 
 * @returns {undefined}
 */
function dibujarOtrosClientes(json){
    ctx.strokeStyle=json.color;
    ctx.lineWidth=json.tam;
    ctx.lineTo(json.coords.x,json.coords.y);
    ctx.stroke(); // Lo transforma en dibujo a línea.
}

/**
 * Borra la parte del tablero en la las coordenadas y tamaño que se indican en el parametro
 * estos datos son los recibidos de otros usuarios
 * @param {type} json datos de la accion que se debe ejecutar
 * @returns {undefined}
 */
function borrarDibujoOtroCliente(json){
    ctx.clearRect(json.coords.x,json.coords.y,json.tam,json.tam);
}

/**
 * Borra la parte selccionada del tablero y envia la accion realizada con los datos pertinentes al server
 * @param {type} x coordenada x del tablero a borrar
 * @param {type} y coordenada y del tablero a borrar
 * @returns {undefined}
 */
function borrarDibujo(x,y){
    ctx.clearRect(x,y,this.tam,this.tam);
    sendData(JSON.stringify({"accion":"borrar","tam":this.tam,"coords":{"x":x,"y":y}}));
}

//Cambia el color para dibujar
function cambiarColor(color){
    this.color=color;    
}

//Cambia el grosor de la linea para dibujar
function cambiarTam(tam){
    this.tam=tam;
}

//Guardar dibujo como imagen
function saveImg(){
    var save=document.getElementById("save");
    save.href=tablero.toDataURL("image/png");
}

//Funcion para seleccionar el lapiz para dibujar en el tablero
function selectLapiz(){
    tablero.style.cursor="url('img/lapiz.png'),default";
    swithAccion="dibujar";
}
//Funcion para seleccionar el borrador para borrar en el tablero
function selectBorrador(){
    tablero.style.cursor="url('img/borrador.png'),default";
    swithAccion="borrar";
}