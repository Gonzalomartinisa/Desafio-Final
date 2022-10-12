const express = require('express');
const passport = require('passport');
const users = require('../src/models/users');
const router = express.Router();
const { fork } = require('child_process');

router.get('/', (req, res) => res.render('index'));

router.get('/signup', (req, res) => {
    res.render('signup')
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/registro',
    failureRedirect: '/',
    passReqToCallback: true, 
}));

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

router.get('/api/randoms', (req, res) => {
    cant = req.query.cant || 100000000;
    const child = fork('routes/calculo.js');
    child.send(cant)
    child.on('message', (resultado) => {
        res.json({resultado});
    });
});

module.exports = router;
