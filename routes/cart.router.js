const { Router } = require('express');
const cartRouter = new Router();
const controllerCart = require('../controllers/cartCont');
const controllerCreateCart = require('../controllers/cartCont');
const controllerAddCart = require('../controllers/addToCart');
const controllerAddToCart = require('../controllers/cartCont');
const controllerGetCart = require('../controllers/cartCont');

// cartRouter.put('/:productName', controllerAddCart.addToCart);
cartRouter.get('/:id', controllerGetCart.getCartCont);
cartRouter.get('/', controllerCart.getAllCartCont);
cartRouter.post('/', controllerCreateCart.createCartCont);
cartRouter.post('/:id/:_id', controllerAddToCart.saveProductCartCont);

module.exports = cartRouter;

// const mongoose = require('mongoose');
// const { Router } = require('express');
// const productModel = require('../models/product');
// const userSchema = require('../models/users');
// const cartModel = require('../models/cart');
// const routerCart = Router();

// routerCart.post('/', (req, res) => {
//     const cart = new cartModel(req.body)
//     cart.save()
//         .then(() => res.json(cart))
//         .catch(error => res.json(error))
// });

// routerCart.put('/:productName', async (req, res) => {
//     try {
//         userID = mongoose.Types.ObjectId(req.headers.userid);
//         let cart = await cartModel.findOne({user: userID});
//         if(!cart){
//             cart = new cartModel({user: userID, products: []});
//             cart = await cart.save()
//         };

//         const product = await productModel.findOne({title: req.params.productName});
//         if(!product) return res.send('Producto no encontrado');

//         console.log(product._id);
//         const result = await cartModel.updateOne(
//             {_id: cart._id},
//             {$push: {product: product._id}}
//         );
//         return res.send(await cartModel.findOne({user: userID}));
//     } catch (error) {
//         console.log(error);
//         res.send(error);
//     }
// });

// module.exports = routerCart;