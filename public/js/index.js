
const socket = io();

socket.on('enviarMensaje',(payload)=>{
    console.log(payload);
});