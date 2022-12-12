import user from '../models/users.js';

//Crear carrito
const createUser = async (object) => {
    try {
        return await user.create({object});
    } catch (error) {
        console.error(error);
        return false;
    }
};

export {createUser};