const express = require('express');
const apiProductos = require('../api.productos/api.productos');

class apiRouter extends express.Router{
    constructor(){
        super()
    
    const apiProductosTest = new apiProductos();

    this.post('/productos', (req, res) => {
        // const cant = Number(req.query.cant) || 5
        const prod = apiProductosTest.productos();
        res.json(prod)
    })

    this.get('/', (req, res) => {
        res.json(apiProductosTest.getAll())
    })
    }
}

module.exports = apiRouter;