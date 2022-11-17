class productDto{
    constructor(product){
        this.id = product.id,
        this.title = product.title,
        this.autor = product.autor,
        this.price = product.price,
        this.img = product.img;
    }
};

module.exports = productDto;