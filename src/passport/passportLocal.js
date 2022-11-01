const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((_id, done) => {
    const user = User.findById(_id, done);
    done(null, user);
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    // usernameField: 'name',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, email, password, done) => {
    const user = await User.findOne({email: email});
    if (user) {
        return done(null, false, req.flash('signupMensaje', 'El nombre ya esta siendo utilizado, vuelta a intentarlo.'))
    } 
    if (!user) {
    const user = new User();
    user.email = email;
    user.password = user.encryptPassword(password);
    // user.name = name;
    await user.save();
    return done(null, user);
    }   
}));

passport.use('local-loguin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, email, password, done) => {
    const user = await User.findOne({email: email});
        if(!user){
            return done(null, false, req.flash('loguinMensaje', 'El usuario no fue encontrado'));
        }
        if(!user.comparePassword(password)){
            return done(null, false, req.flash('loguinMensaje', 'Contraseña incorrecta'));
        }
        done(null, user);
}));