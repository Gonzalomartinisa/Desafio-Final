const configMongo = require('../config/db');
const mongoose = require('mongoose');
const dbClient = require('../dao/dbClient');

class mongoClient extends dbClient{
    constructor(){
        super()   
        this.connected = false,
        this.client = mongoose;    
    }

    async connect(){
        try {
            await this.client.connect('mongodb+srv://Gonzalo:9enbGWk4Moyd65kM@cluster0.oewrg.mongodb.net/?retryWrites=true&w=majority'),
            this.connected = true;
            console.log('Conectado a MongoDB');
        } catch (error) {
            throw new Error('Error: no se pudo conectar a MongoDB', error);
        }
        
    }

    async disconnect(){
        try {
            await this.client.close();
            this.connected = true;
            console.log('Desconectado a MongoDB');
        } catch (error) {
            throw new Error('Error: no se pudo desconectar a MongoDB', error);
        }
    }

    async add(product){
        try {
            const Product = mongoose.model('Product', {
                title: String,
                autor: String,
                price: Number,
                img: String,
            })
            const products = new Product(product)
            return await products.save()
        } catch (error) {
            throw new Error('No se pudo agregar el producto a mongoDB', error);
        }
    }

    async get(){
        try {
            const Product = mongoose.model('Product', {
                title: String,
                autor: String,
                price: Number,
                img: String,
            })
            const products = Product.find();
            return await products;
        } catch (error) {
            throw new Error('No se encontraron los productos', error);
        }
    }

    async getById(id){
        try {
            const Product = mongoose.model('Product', {
                title: String,
                autor: String,
                price: Number,
                img: String,
            })
            const products = Product.findById(id);
            return await products;
        } catch (error) {
            throw new Error('No se encontro el producto', error);
        }
    }
};

module.exports = mongoClient;