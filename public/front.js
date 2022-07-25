// let username = sessionStorage.getItem('username');
// if(!username){
//     username = prompt('Ingrese su email'),
//     sessionStorage.setItem('username', username)
// }

// document.getElementById('username').innerHTML = `Bienvenido ${username}`;

const socket = io();

const btn = document.getElementById('btn');

btn.onclick = e => {
    e.preventDefault()
    const usuario = document.getElementById('email').value;
    const txt = document.getElementById('mensaje').value
    
    socket.emit('notificacion', {txt, usuario});
}

const div = document.getElementById('mensajes');

loadFirstData();

socket.on('chat-out', data => {
    addData(data);
});

function addData(data) {
    const div = document.getElementById('mensajes');
    div.innerHTML = div.innerHTML + "<br>" + `<b>${data.usuario}</b> [${data.date} ${data.time}]: <i>${data.txt}</i>`;
};

function loadData(data){
    console.log(data)
    data.forEach(data => addData(data));
}

function loadFirstData(){
    fetch('/data')
       .then(data => data.json())
       .then(data => {
            loadData(data.data)
        })
      
}
