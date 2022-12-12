import {createUser} from '../dao/userDao.js';

async function serviceCreateUser(data) {
    await createUser(data)
    return data
};

export {serviceCreateUser};
