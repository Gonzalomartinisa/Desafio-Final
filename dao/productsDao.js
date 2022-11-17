const mongoClient = require('../dao/mongoClient')

class productsDao {

    constructor() {
        this.client = new mongoClient();
        this.client.connect();
    }

    async add(product) {
        return await this.client.add(product)
    }

    async get() {
        return await this.client.get()
    }

    async getById(id) {
        return await this.client.getById(id)
    }

    async exit() {
        return await this.client.disconnect()
    }
};

module.exports = productsDao;