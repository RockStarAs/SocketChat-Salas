//? Referencias jQuery
let divUsuarios = $('#divUsuarios');
let frmEnviar = $('#frmEnviar');
let txtMensaje = $('#txtMensaje');
let divChatbox = $('#divChatbox');
//* Funciones para renderizar usuarios
let _params = new URLSearchParams( window.location.search);
const renderizarUsuarios = (personas = [])=>{
    console.log(personas);
    let html = `<li>
        <a href="javascript:void(0)" class="active"> Chat de <span> ${_params.get('sala')}</span></a>
    </li>`;

    personas.forEach( (persona) =>{
        html += `<li>
            <a data-id="${persona.id}" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${persona.nombre} <small class="text-success">online</small></span></a>
        </li>`;
    });

    divUsuarios.html(html);
};

const renderizarMensajes = (mensaje, otro = true, admin = false)=>{
    let html = '';
    let fecha = new Date(mensaje.fecha);
    let hora = fecha.getHours() + ':' + fecha.getMinutes();
    if(admin){
        if(mensaje.nombre === 'Administrador'){
            html = `<li class="animated fadeIn">
                <div class="chat-content">
                    <h5>${mensaje.nombre}</h5>
                    <div class="box bg-light-danger">${mensaje.mensaje}</div>
                </div>
            <div class="chat-time">${hora}</div>
        </li>`;
        }
    }else{
        if(otro){
            html = `<li class="animated fadeIn">
            <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>
                <div class="chat-content">
                    <h5>${mensaje.nombre}</h5>
                    <div class="box bg-light-info">${mensaje.mensaje}</div>
                </div>
            <div class="chat-time">${hora}</div>
        </li>`;
        }else{
            html = `<li class="reverse">
            <div class="chat-content">
                <h5>${mensaje.nombre}</h5>
                <div class="box bg-light-inverse">${mensaje.mensaje}</div>
            </div>
            <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>
            <div class="chat-time">${hora}</div>
            </li>`;
        }
    }
    divChatbox.append(html);
};

//* Listeners
divUsuarios.on('click','a',function(){
    let id = $(this).attr('data-id');
    if(id){
        console.log(id);
    }
});

frmEnviar.on('submit',(e)=>{
    e.preventDefault();
    if(txtMensaje.val().trim().length === 0){
        return;
    }
    socket.emit('enviarMensaje',{nombre: _params.get('nombre'), mensaje : txtMensaje.val()},(res)=>{
        txtMensaje.val('').focus();
        renderizarMensajes(res,false);
        scrollBottom();
        console.log(res);
    });
});

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}