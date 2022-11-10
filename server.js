const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const Contenedor = require('./dao/contenedor');
const newData = new Contenedor('./localhost/newData.json');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
// require("dotenv").config();
const parseArgv = require('minimist');
const producto = new Contenedor('./localhost/producto.json');
const connectMongoDB = require('./config/db');

//Inicio
require('./controllers/passportLocal');
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
const routerCart = require('./routes/cart.router');
const routerProduct = require('./routes/products.router');
const routerUsers = require('./routes/users.router');
// const { default: mongoose } = require('mongoose');
app.use('/', routes);
app.use('/api/cart', routerCart);
app.use('/api/product', routerProduct);
app.use('/api/user', routerUsers);
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

  app.get('/data2', (req, res) => {
      const data = producto.getAll()
     .then((data)=>{
          res.json({data})
      })
     .catch((error)=>{
         console.log(error)
    })
 });

io.on('connection', (socket) => {
    socket.on('notificacion', data => {
        const time = new Date().toLocaleTimeString()
        const date = new Date().toDateString()
        const dataOut = {
            author: data,
            date, 
            time,
        }
        newData.save(dataOut);
        io.sockets.emit('chat-out', dataOut);
    })
    socket.on('notiProductos', data => {
        const dataOut = {
            title: data.title,
            precio: data.precio,
            autor: data.autor,
            img: data.img
        }
        producto.save(dataOut);
        io.sockets.emit('product-out', dataOut);
    })
});

//Puerto
connectMongoDB(() => {
    const options = {default: {port: 8081}};
    const port = parseArgv(process.argv.slice(2), options);
    server.listen(port, () => console.log(`Servidor corriendo...`));
    })
    

