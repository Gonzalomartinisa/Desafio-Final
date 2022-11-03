const mongoose = require('mongoose');
const { Router } = require('express');
const productModel = require('../src/models/product');
const userSchema = require('../src/models/users');
const cartModel = require('../src/models/cart');
const routerCart = Router();

routerCart.post('/', (req, res) => {
    const cart = new cartModel(req.body)
    cart.save()
        .then(() => res.json(cart))
        .catch(error => res.json(error))
});

routerCart.put('/:productName', async (req, res) => {
    try {
        userID = mongoose.Types.ObjectId(req.headers.userid);
        let cart = await cartModel.findOne({user: userID});
        if(!cart){
            cart = new cartModel({user: userID, products: []});
            cart = await cart.save()
        };

        const product = await productModel.findOne({title: req.params.productName});
        if(!product) return res.send('Producto no encontrado');

        console.log(product._id);
        const result = await cartModel.updateOne(
            {_id: cart._id},
            {$push: {product: product._id}}
        );
        return res.send(await cartModel.findOne({user: userID}));
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

module.exports = routerCart;