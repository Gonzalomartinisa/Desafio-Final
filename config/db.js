const mongoose = require('mongoose')

const connectMongoDB = db => {
    mongoose.connect('mongodb+srv://Gonzalo:9enbGWk4Moyd65kM@cluster0.oewrg.mongodb.net/?retryWrites=true&w=majority')
        .then(() => {
            console.log('Conectado a mongoDB Atlas');
            db()
        })
}

module.exports = connectMongoDB;