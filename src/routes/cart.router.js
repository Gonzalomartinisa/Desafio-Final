import { Router } from 'express';
const routerCart = new Router();
import controllerCart from '../controllers/cartCont.js';
import controllerCreateCart from '../controllers/cartCont.js';
import controllerAddToCart from '../controllers/cartCont.js';
import controllerGetCart from '../controllers/cartCont.js';
import controllerDeleteCart from '../controllers/cartCont.js';
import controllerDeleteProduct from '../controllers/cartCont.js';
import controllerGetAllProductCart from '../controllers/cartCont.js';

routerCart.get('/:id', controllerGetCart.getCartCont);
routerCart.get('/', controllerCart.getAllCartCont);
routerCart.get('/:id/productos', controllerGetAllProductCart.getProductCartId);
routerCart.post('/', controllerCreateCart.createCartCont);
routerCart.post('/:id_prod/product/:id', controllerAddToCart.saveProductCartCont);
routerCart.delete('/:id', controllerDeleteCart.deleteProductCont);
routerCart.delete('/:id_prod/product/:id', controllerDeleteProduct.deleteProductCartCont);

export default routerCart;

