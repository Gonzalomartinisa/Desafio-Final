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

const saveProductCart = async (_id, id) => {
    try {
  
        const producto = await productModel.find({ id: _id.id }).limit(1)
    
        if (producto == '') {
    
          return 'El producto no existe'
    
        }
       
        const carrito = await cartModel.find({ id: id })
    
        if (carrito == '') {
    
          return 'El carrito no existe'
    
        }
    
        carrito[0].products.push(producto[0])
    
        await cartModel.findOneAndUpdate({ id: id }, { ...carrito[0] })
    
        return { product: 'Producto Agregado con exito' }
    
      } catch (err) {
    
        return { msg: `Error: ${err}` }
    
      }
    
    }
    // try{
    //     const producto = await productModel(body);
    //     await cartModel.findByIdAndUpdate(id,{
    //         $push: {
    //             'products': producto
    //         } 
    //     })
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
    // } catch (error) {
    //     console.log(error);
        
    // }






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

// const saveProductInCart = async (body, id) => {

//     try {
  
//       const producto = await coleccionProducts.find({ id: body.id }).limit(1)
  
//       if (producto == '') {
  
//         return 'El producto no existe'
  
//       }
  
//       const carrito = await coleccion.find({ id: id })
  
//       if (carrito == '') {
  
//         return 'El carrito no existe'
  
//       }
  
//       carrito[0].products.push(producto[0])
  
//       await coleccion.findOneAndUpdate({ id: id }, { ...carrito[0] })
  
//       return { product: 'Producto Agregado con exito' }
  
//     } catch (err) {
  
//       return { msg: `Error: ${err}` }
  
//     }
  
//   }