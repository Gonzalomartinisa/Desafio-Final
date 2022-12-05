import {
    createCart, 
    getCartId, 
    getAllCart, 
    deleteCart,
    saveProductCart,
    deleteProductCart
} from '../dao/cartDao.js';

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

export {
    serviceCreateCart,
    serviceGetAllCart,
    serviceGetCartId,
    serviceDeletetCart,
    serviceSaveProductCart,
    serviceDeleteProductCart
};