const { normalize, schema } = require('normalizr');
const fs = require('fs');

const authorSchema = new schema.Entity('author');
const textSchema = new schema.Entity('id', {
    author: authorSchema,
});

fs.readFile('./newData.json', 'utf-8', (err, data) => {
    if (err) {
        console.log(err)
        return
    }
    json = JSON.parse(data)

const dataNormalizada = normalize(json, [textSchema]);
console.log(dataNormalizada)

fs.writeFile('./data_normalizada.json', JSON.stringify(dataNormalizada), err => {
    console.log(err);
   });
});