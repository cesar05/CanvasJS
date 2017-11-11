/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.udea.paintweb;

import java.io.StringWriter;
import javax.json.Json;
import javax.json.JsonObject;

/**
 * Clase POJO encarga de manejar la informacion que se envia y recibe desde los usuarios
 * @author Cesar
 */
public class Datos {
    private JsonObject json;
    
    public Datos() {
    }    

    public Datos(JsonObject json) {
        this.json = json;
    }

    public JsonObject getJson() {
        return json;
    }

    public void setJson(JsonObject json) {
        this.json = json;
    }

    @Override
    public String toString() {
        StringWriter write=new StringWriter();
        Json.createWriter(write).write(json);
        return write.toString();
    }
}
