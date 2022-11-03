const { Router } = require('express');
const productModel = require('../models/product');
const routerProduct = Router();

routerProduct.post('/', (req, res) => {
    const product = new productModel(req.body)
    product.save()
        .then(() => res.json(product))
        .catch(error => res.json(error))
});

routerProduct.get('/:name?', (req, res) => {
    productModel.find(req.params.name ? {name: req.params.name} : {})
        .then(product => res.json(product))
        .catch(error => res.json(error))
});

module.exports = routerProduct;