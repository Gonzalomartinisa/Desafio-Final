const { normalize, schema, denormalize } = require('normalizr');
const fs = require('fs');

const authorSchema = new schema.Entity('author');
const textSchema = new schema.Entity('id', {
    author: authorSchema,
});

fs.readFile('./data_normalizada.json', 'utf-8', (err, data) => {
    if (err) {
        console.log(err)
        return
    }
    json = JSON.parse(data)

const dataDenormalizada = denormalize(json.result, [textSchema], json.entities);
console.log(dataDenormalizada)

fs.writeFile('./data_desnormalizada.json', JSON.stringify(dataDenormalizada), err => {
    console.log(err);
   });
});