import { Router } from 'express'
import user from '../models/users.js';
const routerUsers = Router();

let userSchema = user;

routerUsers.post('/', (req, res) => {
    const user = new userSchema(req.body)
    user.save()
        .then(() => res.json(user))
        .catch(error => res.json(error))
});

routerUsers.get('/:email', (req, res) => {
    userSchema.find(req.params.email ? {name: req.params.email} : {})
        .then(user => res.json(user))
        .catch(error => res.json(error))
});

export default routerUsers;