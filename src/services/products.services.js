import { 
    createProduct, 
    getAll, 
    getProduct, 
    deleteProduct, 
    updateProduct 
} from '../dao/productDao.js';

async function serviceCreateProduct(data) {
    await createProduct(data)
    return data
};

async function serviceGetAll() {
    return await getAll()
};

async function serviceGetProduct(data) {
    const producto = await getProduct(data)
    return producto;
};

async function serviceDeleteProduct(data) {
    await deleteProduct(data)
    return data;
};

async function serviceUpdateProduct(id, data) {
    const productUpdate = await updateProduct(id, data)
    return productUpdate;
};

export { 
    serviceCreateProduct, 
    serviceGetAll, 
    serviceGetProduct, 
    serviceDeleteProduct,
    serviceUpdateProduct,
};