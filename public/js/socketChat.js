const socket = io();
//Referencias
let params = new URLSearchParams( window.location.search);
if(!params.has('nombre') || !params.has('sala')){
    window.location = 'index.html';
    throw new Error('El nombre es necesario');
}

let usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

socket.emit('entrarChat', usuario, (respuesta)=>{
    console.log('Usuarios conectados', respuesta);
});

socket.on('usuarioDesconectado',(msj)=>{
    console.log(msj);
});

socket.on('listadoPersonas',(personas)=>{
    console.log(personas);
});

socket.on('recibeMensaje',(data)=>{
    console.log(data);
}); 

socket.on('mensajePrivado',(data)=>{
    console.log('Mensaje privado', data);
});