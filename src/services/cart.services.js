import {
    createCart, 
    getCartId, 
    getAllCart, 
    deleteCart,
    saveProductCart,
    deleteProductCart,
    getAllProductsCart
} from '../dao/cartDao.js';

import sendMessage from '../components/notificaciones/message.js'

async function serviceCreateCart() {
    const cart = await createCart()
    return cart
};

async function serviceGetAllCart() {
    return await getAllCart()
};

async function serviceGetCartId(id) {
    return await getCartId(id)
};

async function serviceDeletetCart(id) {
    return await deleteCart(id)
};

async function serviceSaveProductCart(id, data) {
    const productUpdate = await saveProductCart(id, data)
    return productUpdate;
};

async function serviceDeleteProductCart(id, data) {
    const productDelete = await deleteProductCart(id, data)
    return productDelete;
};

async function serviceGetAllProductsCart(id) {
    const product = await getAllProductsCart(id);
    sendMessage(product);
    console.log(product)
};

async function deleteProductInCart(user) {
    sendMessage(
        `Nuevo pedido de ${user} desde ${user}`,
         await getAllProductsCart()
        
      )
    console.log(user)
}

export {
    serviceCreateCart,
    serviceGetAllCart,
    serviceGetCartId,
    serviceDeletetCart,
    serviceSaveProductCart,
    serviceDeleteProductCart,
    serviceGetAllProductsCart,
    deleteProductInCart
};