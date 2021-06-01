import express from 'express'
import cors from 'cors'
import * as io from 'socket.io'
import http from 'http'
import { socketController } from '../sockets/controller.js';
//import {createServer} from 'http' (1)
class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;  
        //linea para unir el servidor que crea express con el server de sockets que se esta creando
        this.server = http.createServer(this.app)
        //this.server = createServer(this.app)  (1)
        //agregar la funcionalidad de socket
        this.io=new io.Server(this.server) 
        this.middlewares();
        this.sockets();
    }
    middlewares(){
        this.app.use(cors());
        this.app.use(express.static('public'))
    }
    //el que va a estar escuchando
    sockets(){
        this.io.on('connection',socketController)
    }
    listen(){
        //this.app.listen(this.port , ()=>{
            //thi.server hereda de la propiedad de servidor del this.app
        this.server.listen(this.port , ()=>{
            console.log(`Servidor corriendo en el puesto ${this.port}`);
        });
    }
}
export default Server