/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var tablero=document.getElementById("tablero");
var ctx=tablero.getContext("2d");
var color="#000";
var tam="2";
var swithDibujar=false;
var swithAccion="";
ctx.fillStyle=color;

tablero.onmousemove=function(event){
    if(!this.swithDibujar)return;
    if(swithAccion==="dibujar"){
        dibujar(event.clientX,event.clientY);
    }
    else if(swithAccion==="borrar"){
        borrarDibujo(event.clientX,event.clientY);
    }
};

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
tablero.onmouseup=function(event){
    this.swithDibujar=false;
    //Notificar fin de dibujo
    sendData(JSON.stringify({
        "finDibujarOtroCliente":true
    }));
    //Finalizar Dibujo
    ctx.closePath();
};

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
function dibujarOtrosClientes(json){
    ctx.strokeStyle=json.color;
    ctx.lineWidth=json.tam;
    ctx.lineTo(json.coords.x,json.coords.y);
    ctx.stroke(); // Lo transforma en dibujo a línea.
}
function borrarDibujoOtroCliente(json){
    ctx.clearRect(json.coords.x,json.coords.y,json.tam,json.tam);
}
function borrarDibujo(x,y){
    ctx.clearRect(x,y,this.tam,this.tam);
    sendData(JSON.stringify({"accion":"borrar","tam":this.tam,"coords":{"x":x,"y":y}}));
}
function cambiarColor(color){
    this.color=color;    
}
function cambiarTam(tam){
    this.tam=tam;
}

//Guardar dibujo como imagen
function saveImg(){
    var save=document.getElementById("save");
    save.href=tablero.toDataURL("image/png");
}

function selectLapiz(){
    tablero.style.cursor="url('img/lapiz.png'),default";
    swithAccion="dibujar";
}
function selectBorrador(){
    tablero.style.cursor="url('img/borrador.png'),default";
    swithAccion="borrar";
}