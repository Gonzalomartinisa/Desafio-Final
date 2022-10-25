const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const Contenedor = require('./contenedor');
const newData = new Contenedor('newData.json');
const { faker } = require('@faker-js/faker');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
require("dotenv").config();
const parseArgv = require('minimist');

//Inicio
require('./src/passport/passportLocal');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middlewares
app.use(flash());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/public', express.static(__dirname + '/public'));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    rolling: true,
    cookie: { maxAge: 30000, secure: false, htppOnly: false }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) =>{
    app.locals.signupMensaje = req.flash('signupMensaje');
    app.locals.loguinMensaje = req.flash('loguinMensaje');
    app.locals.user = req.user;
    next();
})

//Routes
const routes = require('./routes/routes');
const { default: mongoose } = require('mongoose');
app.use('/', routes)
app.get('/', (req, res) =>{
     res.sendFile(__dirname + '/views/index.ejs')
});

app.get('/data', (req, res) => {
    const data = newData.getAll()
    .then((data)=>{
        res.json({data})
    })
    .catch((error)=>{
        console.log(error)
    })
});

  app.get('/api/productos-test', async (req, res) => {
    try {
    const product = []
    let prod = {}
    for (let i = 0; i < 5; i++) {
        prod = {
            title:faker.commerce.productName(),
            autor:faker.name.fullName(),
            price:faker.commerce.price(),
            img:faker.image.avatar()
        }       
        product.push(prod)     
    }
         res.json({data:product})
    } catch (error) {
         console.log(error)    
    }
});

io.on('connection', (socket) => {
    socket.on('notificacion', data => {
        const time = new Date().toLocaleTimeString()
        const date = new Date().toDateString()
        const dataOut = {
            author: data,
            date, 
            time
        }
        newData.save(dataOut);
        io.sockets.emit('chat-out', dataOut);
    })
    socket.on('notiProductos', data => {
        knex('productos').insert({
            title: data.title,
            autor: data.autor,
            img: data.img,
            price: data.price,
        })
        .then(() => console.log("productos insertados"))
        .catch(err => {console.log(err); throw err})
        const dataOut = data
        // producto.save(dataOut);
        io.sockets.emit('product-out', dataOut);
    })
})

//Base de datos
mongoose
   .connect(process.env.MONGODB)
   .then(() => console.log('Conectado a mongoDB Atlas'))
   .catch((error) => console.log(error))

//Puerto
const PORT = process.env.PORT || 8080;
const servidor = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});

servidor.on('error', error => console.log(`Error en el servidor ${error}`));
// const options = {default: {port: 3000}};
// const port = parseArgv(process.argv.slice(2), options);
// server.listen(port, () => console.log(`Servidor corriendo...`));
