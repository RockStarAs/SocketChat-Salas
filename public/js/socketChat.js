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
    renderizarUsuarios(respuesta);
    //console.log('Usuarios conectados', respuesta);
});

socket.on('usuarioDesconectado',(msj)=>{
    renderizarMensajes(msj,undefined,true);
    console.log(msj);
});

socket.on('listadoPersonas',(personas)=>{
    //console.log(personas);
    renderizarUsuarios(personas);
});

socket.on('recibeMensaje',(data)=>{
    console.log(data);
    if(data.nombre =='Administrador'){
        renderizarMensajes(data,undefined,true);
    }else{
        renderizarMensajes(data,true);
    }
    scrollBottom();
    
}); 

socket.on('mensajePrivado',(data)=>{
    console.log('Mensaje privado', data);
});