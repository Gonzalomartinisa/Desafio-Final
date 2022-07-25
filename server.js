const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const Contenedor = require('./contenedor');
const newData = new Contenedor('newData.json')

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => res.render('index'));

const PORT = process.env.PORT || 3000

app.get('/data', (res, req) => {
    const data = newData.getAll()
    res.json({data})
});

io.on('connection', (socket) => {
    socket.on('notificacion', data => {
        const time = new Date().toLocaleTimeString()
        const date = new Date().toDateString()
        const dataOut = {
            txt: data.txt,
            username: data.username,
            time,
            date
        }
        newData.save(dataOut);
        io.sockets.emit('chat-out', dataOut);
    })
})

server.listen(PORT, () => console.log('Servidor corriendo...'));