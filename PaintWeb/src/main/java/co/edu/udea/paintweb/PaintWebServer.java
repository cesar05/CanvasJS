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
 *
 * @author Cesar
 */

@ServerEndpoint(value="/paintweb",encoders = {DatosEncoder.class},decoders = {DatosDecoder.class})
public class PaintWebServer {
    
    private static final Set<Session> CLIENTES=Collections.synchronizedSet(new HashSet<Session>());
    
    @OnMessage
    public void broadcastFigure(Datos datos,Session session) throws IOException, EncodeException {
        System.out.println("Datos: "+datos);
        for(Session peer: CLIENTES){
            if(!peer.equals(session)){
                peer.getBasicRemote().sendObject(datos);
            }
        }
    }

    @OnOpen
    public void onOpen(Session peer) {
        this.CLIENTES.add(peer);                
    }

    @OnError
    public void onError(Throwable t) {
    }

    @OnClose
    public void onClose(Session peer) {
        this.CLIENTES.remove(peer);
    }
}
