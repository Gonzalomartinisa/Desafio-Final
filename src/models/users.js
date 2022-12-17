import mongoose from 'mongoose';
const { Schema } = mongoose;
import bcrypt from 'bcrypt';

const userSchema = new Schema({
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true},
      firstName: { type: String, required: true},
      lastName: { type: String, required: true},
      address: { type: String, required: true},
      avatar: { type: String, required: true},
      country_code: { type: Number},
      phone: { type: Number, required: true, unique: true },
      age:{ type: Number, required: true},
      rol: {type: String, max: 10}
});

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function(password){
    return bcrypt. compareSync(password, this.password);
};

let user = mongoose.model('users', userSchema);

export default user;
