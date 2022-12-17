import cartModel from "../models/cart.js";
import productModel from '../models/product.js';

let cart = cartModel;
let product = productModel;

//Crear carrito
const createCart = async () => {
    try {
        return await cartModel.create({}).lean();
    } catch (error) {
        console.error(error);
        return false;
    }
};

//Mostrar carrito por ID
const getCartId = async (id) => {
    try {
        return await cart.findById(id).lean();
    } catch (error) {
        console.log(error);
        return false;
    }
};

//Mostrar todos los carritos
const getAllCart = async() => {
    try {
        return await cart.find();
    } catch (error) {
        console.error(error);
        return false;
    }
};

//Borrar un carrito
const deleteCart = async (id) => {
    try {
        return await cartModel.findByIdAndDelete(id);
    } catch (error) {
        console.error(error);
    }
};

//Agregar un producto al carrito
const saveProductCart = async (id_prod, id) => {
    try {  
        const producto = await product.findById(id_prod)    
        if (producto == '') {    
            return 'El producto no existe'   
        }
        const carrito = await cart.findById(id)    
        if (carrito == '') {   
            return 'El carrito no existe'
        }    
        carrito.products.push(producto)    
        await carrito.save();
        // findOneAndUpdate(id, { ...carrito })    
        return { Producto: 'El producto fue agregado con exito' }    
        } catch (error) {
            console.error(error);
            return { msg: `Error: ${error}` }
        };   
};

//Borrar un producto del carrito
const deleteProductCart = async (id_prod, id) => {
    try {  
        const producto = await product.findById(id_prod)    
        if (producto == '') {    
            return 'El producto no existe'   
        }
        const carrito = await cart.findById(id);    
        if (carrito == '') {   
            return 'El carrito no existe'
        }    
        carrito.products.remove(producto);    
        await carrito.save(); 
        return { Producto: 'El producto fue borrado con exito' }    
        } catch (error) {
            console.error(error);
            return false;   
        };   
};

//Mostrar todos los productos de un carrito por ID
const getAllProductsCart = async (id) => {
    try {
        return await cart.findById(id).populate('products').select({products: 1, _id:0});
    } catch (error) {
        console.error(error);
        return null;
    }
};

//Vaciar carrito por ID

export {
    createCart, 
    getCartId, 
    getAllCart, 
    deleteCart, 
    saveProductCart,
    deleteProductCart,
    getAllProductsCart
};

