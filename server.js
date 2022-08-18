const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const Contenedor = require('./contenedor');
const newData = new Contenedor('newData.json')
const producto = new Contenedor('producto.json')
const { options } = require('./options/db.js');

const knex = require('knex')(options);

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

app.get('/data', (req, res) => {
    const data = newData.getAll()
    .then((data)=>{
        res.json({data})
    })
    .catch((error)=>{
        console.log(error)
    })
});

app.get('/data2',(req,res)=>{
     const produc = []
     knex.select('*').from('productos')
         .then(productos => {
             for (const prod of productos) {
                 produc.push({
                     title:prod.title,
                     autor:prod.autor,
                     price:prod.price,
                     img:prod.img
                 })
             }
             res.json({data:produc})
         })
         .catch((error)=>{
           console.log(error)
   })
})

// })
//   app.get('/data2', (req, res) => {
//       const data = producto.getAll()
//      .then((data)=>{
//           res.json({data})
//       })
//      .catch((error)=>{
//          console.log(error)
//     })
//  });

// 
io.on('connection', (socket) => {
    socket.on('notificacion', data => {
        const time = new Date().toLocaleTimeString()
        const date = new Date().toDateString()
        const dataOut = data
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

server.listen(PORT, () => console.log('Servidor corriendo...'));