const socket = io();

const btn = document.getElementById('btn');

btn.onclick = e => {
    e.preventDefault()
    const nombre = document.getElementById('nombre').value;
    const id = document.getElementById('email').value;
    const text = document.getElementById('mensaje').value;
    const edad = document.getElementById('edad').value;
    const apellido = document.getElementById('apellido').value;
    const alias = document.getElementById('alias').value;
    const avatar = document.getElementById('avatar').value;
    
    socket.emit('notificacion', {author: {id, nombre, edad, apellido, alias, avatar}, text});
}

const div = document.getElementById('mensajes');

loadFirstData();
loadFirstProd();

socket.on('chat-out', data => {
    addData(data);
});

function addData(data) {
    const div = document.getElementById('mensajes');
    div.innerHTML = div.innerHTML + "<br>" + `<b>${data.id}</b> [${data.date} ${data.time}]: <i>${data.text}</i>`;
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

const boton = document.getElementById('boton');

boton.onclick = e => {
    e.preventDefault()
    const title = document.getElementById('title').value
    const autor = document.getElementById('autor').value
    const precio = document.getElementById('precio').value;
    const img = document.getElementById('img').value;
    socket.emit('notiProductos', {title, autor, precio, img});
}

socket.on('product-out', data => {
    addProductos(data)
});

function addProductos(data){
    const div = document.getElementById('mensajes2');
    div.innerHTML +=`
        <tr>
        <th scope="col">#</th>
        <td>${data.title}</td>
        <td>${data.autor}</td>
        <td>${data.precio}</td> 
        <td><img src="${data.img}" style="heitght: 60px; width:60px;"</td> 
        </tr>`
};

function loadProd(data){
    console.log(data)
    data.forEach(data => addProductos(data));
}

function loadFirstProd(){
    fetch('/data2')
       .then(data => data.json())
       .then(data => {
            loadProd(data.data)
        })      
}
  
  

