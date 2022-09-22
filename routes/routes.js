const express = require('express');
const passport = require('passport');
const users = require('../src/models/users');
const router = express.Router();

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

// router.use((req, res, next) => {
//      isAuthenticated(req, res, next);
//      next();
// });

router.get('/failloguin', isAuthenticated, (req, res) => {
    res.send('Nombre o contraseña incorretas')
});

function isAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
};

module.exports = router;
