const { Router } = require('express');
const productRouter = new Router();
const controllerProduct = require('../controllers/productCont');
const controllerAddProduct = require('../controllers/productCont');
const controllerExist = require('../controllers/productCont');

productRouter.get('/', controllerProduct.getAllProducts);
productRouter.post('/', controllerAddProduct.addProducts);
productRouter.get('/:id', controllerExist.getProductCont);

module.exports =  productRouter;
