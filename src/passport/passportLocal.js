const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((_id,done) => {
    User.findById(_id, done);
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, name, password, done) => {
    const user = await User.findOne({name: name});
    if (user) {
        return done(null, false, req.flash('signupMensaje', 'El nombre ya esta siendo utilizado, vuelta a intentarlo.'))
    } 
    if (!user) {
    const user = new User();
    user.name = name,
    user.password = user.encryptPassword(password),
    await user.save();
    return done(null, user);
    }   
}));

passport.use('local-loguin', new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, name, password, done) => {
    const user = await User.findOne({name: name});
        if(!user){
            return done(null, false)
        }
        if(!user.comparePassword(password)){
            return done(null, false)
        }
        done(null, user)
}));