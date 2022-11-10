const cartModel = require("../models/cart");
const productModel = require('../models/product')
const mongoose = require('mongoose');

const createCart = () => {
    try {
        return new cartModel({})
    } catch (error) {
        console.error(error);
        return false;
    }
}

const getCart = (id) => {
    try {
        return cartModel.findById(id);
    } catch (error) {
        console.log(error);
        return false;
    }
}

const getAllCart = () => {
    try {
        return cartModel.find();
    } catch (error) {
        console.error(error);
        return false;
    }
}

const saveProductCart = async (body, id) => {
    try{
        const producto = await productModel(body);
        await cartModel.findByIdAndUpdate(id,{
            $push: {
                'products': producto
            } 
        })
    // try {
    //     userID = mongoose.Types.ObjectId(req.headers.userid);
    //     let cart = await cartModel.findOne({user: userID});
    //     if(!cart){
    //         cart = new cartModel({user: userID, products: []});
    //         cart = await cart.save()
    //     };

    //     const product = await productModel.findOne({title: req.params.productName});
    //     if(!product) return res.send('Producto no encontrado');

    //     console.log(product._id);
    //     const result = await cartModel.updateOne(
    //         {_id: cart._id},
    //         {$push: {products: product._id}}
    //     );
    //     return res.send(await cartModel.findOne({user: userID}));
    } catch (error) {
        console.log(error);
        
    }
};





//     try {
//         const producto = await productModel(body);
//         await cartModel.findByIdAndUpdate(id,{
//          $push: {
//              'productos': producto
//          } 
//      })
//         // const cart = cartModel.findById(id)
//         // cart.products.push(obj.productId);
//         // cart.save();
//         return true;
//     } catch (error) {
//         console.error(error);
//         return false;
//     }
// }

module.exports = { createCart, getCart, getAllCart, saveProductCart };