import { Router } from 'express'
import user from '../models/users.js';
const routerUsers = Router();
import passport from '../components/passportLocal.js';

let userSchema = user;

routerUsers.get('/', (req, res) => res.render('index'));

routerUsers.get('/signup', (req, res) => {
    res.render('signup');
});

routerUsers.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/registro',
    failureRedirect: '/',
    passReqToCallback: true, 
}));

routerUsers.get('/registro', isAuthenticated, (req, res) => {
    res.render('registro', {usuario: "El usuario ha sido registrado con exito"});
});

routerUsers.get('/failsignup', isAuthenticated, (req, res) => {
   res.send('Ya exsite un usuario con ese nombre')
});

routerUsers.get('/loguin', isAuthenticated, (req, res) => {
   res.render('loguin')
});

routerUsers.post('/loguin', passport.authenticate('local-loguin', {
   successRedirect: '/',
   failureRedirect: '/',
   passReqToCallback: true,
}));

routerUsers.get('/userlog', isAuthenticated, (req, res) => {
   res.send('El usuario se ha logueado correctamente')
});

routerUsers.get('/logout', isAuthenticated, (req, res, next) =>{
       req.logout(function(err) {
       if (err) { return next(err); }
   res.redirect('/');
 });
});

routerUsers.get('/failloguin', isAuthenticated, (req, res) => {
   res.send('Nombre o contraseña incorretas')
});

routerUsers.get('/email', (req, res) =>{
    res.render('email')
});
routerUsers.post('/', (req, res) => {
    const user = new userSchema(req.body)
    user.save()
        .then(() => res.json(user))
        .catch(error => res.json(error))
});

routerUsers.get('/:email', (req, res) => {
    userSchema.find(req.params.email ? {name: req.params.email} : {})
        .then(user => res.json(user))
        .catch(error => res.json(error))
});

function isAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
};

export default routerUsers;