const { options } = require('./options/db.js');
const knex = require('knex')(options);

const productos = [
    {title: 'gonzalo', autor: 'isa', price: 60000},
    {title: 'gonzalo', autor: 'isa', price: 60000},
    {title: 'gonzalo', autor: 'isa', price: 60000}
]

knex('productos').insert(productos)
    .then(() => console.log("productos insertados"))
    .catch(err => {console.log(err); throw err})
    .finally(() => {
        knex.destroy()
    })