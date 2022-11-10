const mongoose = require('mongoose');

const cartModel = mongoose.model('cart', mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'products'}],
}));

module.exports = cartModel;