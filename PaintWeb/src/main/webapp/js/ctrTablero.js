/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var tablero=document.getElementById("tablero");
var ctx=tablero.getContext("2d");
var color="#000"
var tam="2";
ctx.fillStyle=color;

tablero.onmousemove=function(event){
    var x=event.clientX;
    var y=event.clientY;
    dibujar(x,y);
    //console.log(x+"-"+y);
};

function dibujar(x,y){
    ctx.fillStyle=this.color;
    ctx.fillRect(x,y,this.tam,this.tam);
    json=JSON.stringify({
        "color":ctx.fillStyle,
        "tam":tam,
        "coords":{
            "x":x,
            "y":y
        }
    });
    sendData(json);
}
function dibujarOtrosClientes(json){
    ctx.fillStyle=json.color;
    ctx.fillRect(json.coords.x,json.coords.y,json.tam,json.tam);
}
function cambiarColor(color){
    this.color=color;    
}
function cambiarTam(tam){
    this.tam=tam;
}
