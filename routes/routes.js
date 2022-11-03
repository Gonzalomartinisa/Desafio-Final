const express = require('express');
const passport = require('passport');
const users = require('../models/users');
const router = express.Router();
const nodemailer = require('nodemailer');
const {sendMessage} = require('../services/email.services');

router.get('/', (req, res) => res.render('index'));

router.get('/signup', (req, res) => {
    res.render('signup')
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/registro',
    failureRedirect: '/',
    passReqToCallback: true, 
}));

router.get('/email', (req, res) =>{
    res.render('email')
});

router.post('/email', async (req, res) =>{
    const {name, email, password, phone} = req.body;
    contentHTML = `
    <h1>Informacion del usuario</h1>
       <ul>
           <li>Nombre: ${name}</li>
           <li>Email: ${phone}</li>
           <li>Email: ${email}</li>
           <li>Password: ${password}</li>
       </ul>
    `;

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'kristian29@ethereal.email',
            pass: '5wQxcD7chXJ3SeVrKD'
        }
    });

    const mailOptions = {
        from: "Servidor de node.js",
        to: 'kristian29@ethereal.email',
        subject: "Info del usuario",
        html: contentHTML
    };

    try {
        const info = await transporter.sendMail(mailOptions)
        console.log(info)
    } catch (error) {
        console.log(error)
    };

    const response = await sendMessage(req.body.phone, req.body.message);
    console.log(response);
    res.send('Received')

    // res.redirect('/email')
});

router.get('/registro', (req, res) => {
     res.render('registro', {usuario: "El usuario ha sido registrado con exito"});
});

router.get('/failsignup', (req, res) => {
    res.send('Ya exsite un usuario con ese nombre')
});

router.get('/loguin', (req, res) => {
    res.render('loguin')
});

router.post('/loguin', passport.authenticate('local-loguin', {
    successRedirect: '/',
    failureRedirect: '/',
    passReqToCallback: true,
}));

router.get('/userlog', (req, res) => {
    res.send('El usuario se ha logueado correctamente')
});

router.get('/logout', (req, res, next) =>{
        req.logout(function(err) {
        if (err) { return next(err); }
    res.redirect('/');
  });
});

router.get('/failloguin', isAuthenticated, (req, res) => {
    res.send('Nombre o contraseña incorretas')
});

function isAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
};

router.get('/info', (req, res) => {
    const info = {
        programa: process.title,
        plataforma:  process.platform,
        processID: process.pid,
        directorio: process.cwd(),
        version: process.version,
        memoria: process.memoryUsage().rss,
        argv: process.argv.slice(2),
        cpus: require('os').cpus().length
    }
    res.render('info', {info})
});

module.exports = router;
