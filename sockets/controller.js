const {Usuarios} = require('../models/usuarios');
const usuarios = new Usuarios();
const {crearMensaje} = require('../utils/utilidades');

const socketController = (socket, io) => {
    
    //console.log('Usuario conectado');
    socket.on('entrarChat', (usuario,callback)=>{
        if(!usuario.nombre || !usuario.sala){
            return callback({
                error: true,
                mensaje: 'El nombre o sala es necesario'
            });
        }
        socket.join(usuario.sala);
        let personas = usuarios.agregarPersona(socket.id,usuario.nombre,usuario.sala);
        socket.to(usuario.sala).emit('listadoPersonas',usuarios.getPersonasxSala(usuario.sala));

        callback(personas);

    });

    socket.on('disconnect', ()=>{
        let personaBorrada = usuarios.borrarPersona(socket.id);
        if(personaBorrada){
            socket.broadcast.to(personaBorrada.sala).emit('usuarioDesconectado',crearMensaje('Administrador',`${personaBorrada.nombre} abandonó el chat`));
            socket.broadcast.to(personaBorrada.sala).emit('listadoPersonas',usuarios.getPersonasxSala(personaBorrada.sala));
        }
    });

    socket.on('enviarMensaje',(data)=>{
        let persona = usuarios.getPersona(socket.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        socket.broadcast.to(persona.sala).emit('recibeMensaje',(mensaje));        
    });

    //* Mensajes privados
    socket.on('mensajePrivado',(data)=>{
        let persona = usuarios.getPersona(data.id);
        let quienEnvia = usuarios.getPersona(socket.id);
        socket.broadcast.to(persona.id).emit('mensajePrivado',crearMensaje(quienEnvia.nombrem,data.mensaje));
    });
}



module.exports = {
    socketController
}

