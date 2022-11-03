const mongoose = require('mongoose');

const cartModel = mongoose.model('Cart', mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    product: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
}));

module.exports = cartModel;