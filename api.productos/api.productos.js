const ContenedorFaker = require('../contenedorFaker');
const { faker } = require('@faker-js/faker');

class apiProductos extends ContenedorFaker{
    constructor(){
        super()
    }

    productos(cant = 5){
        const product = []
        for (let i = 0; i < cant; i++) {
            const newProduct = this.genProduct();
            const saved = this.save(newProduct);
            product.push(saved);            
        }
        return product
    }

    genProduct(){
        return{
            name: faker.name.jobDescriptor(),
            precio: faker.commerce.price(),
            foto: faker.image.avatar(),
        }
    }
}

module.exports = apiProductos;