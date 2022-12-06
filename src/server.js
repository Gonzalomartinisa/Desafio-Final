import express from 'express';
import Contenedor from './components/contenedor.js'; 
const newData = new Contenedor('./localhost/newData.json');
import path from 'path';
import passport from 'passport';
import session from 'express-session';
import flash from 'connect-flash';
const producto = new Contenedor('./localhost/producto.json');
import connectMongoDB from './config/db.js';
import MongoStore from 'connect-mongo'
import 'dotenv/config';
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
app.use(express.static('/public'));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    rolling: true,
    cookie: { maxAge: 30000, secure: false, htppOnly: false },
    // store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) =>{
    app.locals.signupMensaje = req.flash('signupMensaje');
    app.locals.loguinMensaje = req.flash('loguinMensaje');
    app.locals.user = req.user;
    next();
})

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


//Puerto
const PORT = process.env.PORT || 8081
const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
});
server.on('error', (error) => {
  console.log('Hubo un error...')
});
connectMongoDB(() => {});

