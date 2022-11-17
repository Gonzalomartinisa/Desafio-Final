const productDao = require('../dao/productsDao');
const productDto = require('../dto/dto');

class productApi {
    constructor(){
        this.productDao = new productDao();
    }

    async add(product) {
        const productAdd = new productDto(await this.productDao.add(product))
        return productAdd
    }

    async get(){
        let products = await this.productDao.get();
        const allProducts = products.map(p => new productDto(p));
        return allProducts;
    }

    async getById(id){
        let products = await this.productDao.getById(id);
        const idProducts = products.map(p => new productDto(p));
        return idProducts;
    }
};

module.exports = productApi;