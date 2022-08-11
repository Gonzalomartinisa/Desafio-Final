const { options } = require('./options/db.js');
const knex = require('knex')(options);

knex.schema.createTable('productos', table => {
    table.increments('id')
    table.string('title')
    table.string('autor')
    table.string('img')
    table.integer('price')
})
    .then(() => console.log("table create"))
    .catch(err => {console.log(err); throw err})
    .finally(() => {
        knex.destroy()
    })