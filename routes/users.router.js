const { Router } = require('express');
const userSchema = require('../models/users');
const routerUsers = Router();

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

module.exports = routerUsers;