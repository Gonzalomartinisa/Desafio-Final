import mongoose from 'mongoose';

const cartModel = mongoose.model('cart', mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    products: [],
    timestamp: {type: Date, default: Date.now},
}));

export default cartModel;