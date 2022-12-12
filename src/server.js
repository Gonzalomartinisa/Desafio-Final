import express from 'express';
import 'dotenv/config';
import path from 'path';
import passport from 'passport';
import session from 'express-session';
import flash from 'connect-flash';
import mongoStore from 'connect-mongo';
import connectMongoDB from './configs/db.js';
import {Server} from 'socket.io';
import http from 'http';
import cors from 'cors';
import socket from './sockets.js'

import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Inicio
const app = express();
app.set('views', path.join('views'));
app.set('view engine', 'ejs');

//Middlewares
app.use(flash());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    rolling: true,
    cookie: { maxAge: 60000, secure: false, htppOnly: false },
    store: mongoStore.create({mongoUrl: process.env.MONGO_URI,
        options: {
            userNewParser: true,
            useUnifiedTopology: true, 
        }
        })
}));
app.use(cors())
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) =>{
    app.locals.signupMensaje = req.flash('signupMensaje');
    app.locals.loguinMensaje = req.flash('loguinMensaje');
    app.locals.user = req.user;
    next();
});

//Routes
import router from './routes/users.router.js';
import routerCart from './routes/cart.router.js';
import productRouter from './routes/products.router.js';
import routerUsers from './routes/users.router.js';
import process from 'process';

app.use('/', router);
app.use('/api/cart', routerCart);
app.use('/api/product', productRouter);
app.use('/api/user', routerUsers);
app.get('/', (req, res) =>{
     res.sendFile(__dirname, '/views/index.ejs')
});
// app.all("*", (req, res) => {
//   res.status(404).json('Error 404: La ruta buscada no existe')
// });

//Puerto
// const PORT = process.env.PORT || 8081
// const httpServer = server.listen(PORT, () => {
//   console.log(`Servidor corriendo en el puerto ${PORT}`)
//   connectMongoDB(() => {});
// });
// server.on('error', (error) => {
//   console.log('Hubo un error...')
// });
// socket(io);
connectMongoDB(() => {});
//Websockets y puerto
const PORT = process.env.PORT || 8081;
const server = http.createServer(app);
const httpServer = server.listen(PORT);
console.log(`Servidor corriendo en el puerto ${PORT}`);
const io = new Server(httpServer);
socket(io);
