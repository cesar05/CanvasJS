/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.udea.paintweb;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

/**
 * Clase encargada de codificar los datos
 * @author Cesar
 */
public class DatosEncoder implements Encoder.Text<Datos>{

    @Override
    public String encode(Datos datos) throws EncodeException {
        return datos.getJson().toString();
    }

    @Override
    public void init(EndpointConfig config) {
        System.out.println("Init");
    }

    @Override
    public void destroy() {
        System.out.println("Destroy");
    }
    
}
