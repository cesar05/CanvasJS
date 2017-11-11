/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.udea.paintweb;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 * Esta clase es la encargada de recibir la informacion de los usuarios y replicarla a los demass
 * @author Cesar
 */

@ServerEndpoint(value="/paintweb",encoders = {DatosEncoder.class},decoders = {DatosDecoder.class})
public class PaintWebServer {
    
    /**
     * Lista de usuarios conectados
     */
    private static final Set<Session> CLIENTES=Collections.synchronizedSet(new HashSet<Session>());
    
    /**
     * Este metodo se encarga de recibir los datos y enviarselo a los demas usuarios conectados
     * @param datos recibidos por el ususarios
     * @param session del usuario que envia los datos
     * @throws IOException 
     * @throws EncodeException 
     */
    @OnMessage
    public void broadcastFigure(Datos datos,Session session) throws IOException, EncodeException {
        System.out.println("Datos: "+datos);
        for(Session usuarios: CLIENTES){
            if(!usuarios.equals(session)){
                usuarios.getBasicRemote().sendObject(datos);
            }
        }
    }
    
    /**
     * Esta funcion agraga en nuevo usuario a la lista de usuarios conectados
     * @param cliente session del cliente que abre la conexion
     */
    @OnOpen
    public void onOpen(Session cliente) {
        this.CLIENTES.add(cliente);                
    }

    @OnError
    public void onError(Throwable t) {
    }

    /**
     * Metodo encargado de eliminar el cliente de la lista de usuarios conectados
     * @param cliente session del cliente que cierra la conexion
     */
    @OnClose
    public void onClose(Session cliente) {
        this.CLIENTES.remove(cliente);
    }
}
