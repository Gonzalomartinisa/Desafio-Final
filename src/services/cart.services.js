import {
    createCart, 
    getCartId, 
    getAllCart, 
    deleteCart,
    saveProductCart,
    deleteProductCart,
    getAllProductsCart
} from '../dao/cartDao.js';

import emailCart from '../components/notificaciones/emailCart.js';
import msgTwilio from '../components/notificaciones/msgTwilio.js';

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

async function serviceDeletetCart(data) {
    await deleteCart(data)
    return data;
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
    emailCart(product)
    const sms = {
        number: `+541159777543`,
        body: 'Su pedido ha sido recibido y se encuentra en proceso. Gracias por su compra!',
        from: '+19842234151'
      };
      msgTwilio(sms);
    //   console.log(sms);
};
     
export {
    serviceCreateCart,
    serviceGetAllCart,
    serviceGetCartId,
    serviceDeletetCart,
    serviceSaveProductCart,
    serviceDeleteProductCart,
    serviceGetAllProductsCart,
};