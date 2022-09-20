const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Gonzalo:9enbGWk4Moyd65kM@cluster0.oewrg.mongodb.net/?retryWrites=true&w=majority', {    
}, err =>{
    if(err){console.log(err); return}

    console.log('Conectado a mongoDB')
});

// module.exports = mongosse;