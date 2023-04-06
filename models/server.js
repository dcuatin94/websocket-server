const express = require("express");
const cors = require("cors");
const { socketController } = require("../sockets/controller");
// import router from "../routes/userRoute.js";
//Requests: Cuando el usuario hace una peticion
//Response: Cuando el servidor responde a una peticion

//Creamos un servido con express con clases

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.server = require('http').createServer(this.app);
        this.io = require("socket.io") (this.server); //Socket.io: Servidor de sockets

        this.paths = {};

        //Middlewares
        this.middlewares();

        //Rutas de mi app
        this.routes();

        //Sockets
        this.sockets();
    }

    middlewares() {
        //Cors
        this.app.use( cors() ); //use: para usar un middleware
        //Directorio publico
        this.app.use(express.static('public'));
    }

    //Rutas de mi app
    routes() {
        // this.app.use( this.paths.usuariosPath, router);
    }

    //Sockets
    sockets() {
        this.io.on("connection", socketController);
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;