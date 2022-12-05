import mongoose from 'mongoose';

const productModel = mongoose.model('Product', mongoose.Schema({
    title: {type: String, max: 200},
    autor: {type: String},
    img: {type: String},
    price: {type: Number},
}));

export default productModel;

