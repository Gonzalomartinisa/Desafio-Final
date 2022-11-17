const minimist = require('minimist')
const ProductsApi = require('./api/productsApi')

const argv = minimist(process.argv.slice(2))
const {cmd, id, title, price, autor, img} = argv
const productsApi = new ProductsApi();

async function exec() {
    try {
        console.log(cmd);
        switch (cmd.toLowerCase()) {
            case 'get':
                console.log(await productsApi.get());
                break;
            case 'getById':
                console.log(await productsApi.getById(id));
                break;
            case 'add':
                console.log(await productsApi.add({
                    title, autor, price, img, id,
                }));
                break;
            default:
                break;
        }
    } catch(error) {
        console.log(error);
    } finally {
        console.log('finished');
        process.exit()
    }
};

exec()