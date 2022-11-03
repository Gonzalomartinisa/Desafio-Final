const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt')

const userSchema = new Schema({
      email: String,
      password: String,
      firstName: String,
      lastName: String,
      address: String,
      avatar: String,
      phone: Number,
      age: Number,
      rol: {type: String, max: 10}
});

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function(password){
    return bcrypt. compareSync(password, this.password);
};

module.exports = mongoose.model('users', userSchema);
