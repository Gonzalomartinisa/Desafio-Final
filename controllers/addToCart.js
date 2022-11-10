const productModel = require('../models/product');
const cartModel = require('../models/cart');
const mongoose = require('mongoose');

module.exports = {
    addToCart: async (req, res) => {
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
}};

// module.exports = {

//     addToCart: async (req, res) => {
//     const { title, price, autor } = req.body;
//     const productExist = await products.findOne({title});
//     const productData =  title !== "" && price !== "" && autor !== "";
//     const cartExist = await cart.findOne({title});
    
//     if (!productExist) {
//         res.json({mensaje: "El producto no se encuentra disponible"});
//     } else if (productData && !cartExist) {
//         const newProductInCart = new cart({title, price, autor});
//         await products.findByIdAndUpdate(
//             productExist?._id,
//             {inCart: true, title, autor, price},
//             {new: true}
//         )
//         .then((product) => {
//             newProductInCart.save();
//             res.json({mensaje: "El producto fue agregado al carrito", product});
//         })
//         .catch((error) => console.log(error));
    
//     } else if (cartExist){
//         res.json({mensaje: "El producto ya existe en el carrito"});
//     }
// }};