import { Router } from 'express';
const productRouter = new Router();
import controllerProduct from '../controllers/productCont.js';
import controllerAddProduct from '../controllers/productCont.js';
import controllerExist from '../controllers/productCont.js';
import controllerDelete from '../controllers/productCont.js';
import controllerUpdate from '../controllers/productCont.js';

productRouter.get('/', controllerProduct.getAllProducts);
productRouter.post('/', controllerAddProduct.addProducts);
productRouter.get('/:id', controllerExist.getProductCont);
productRouter.delete('/delete/:id', controllerDelete.deleteProductCont);
productRouter.put('/update/:id', controllerUpdate.updateProductCont);

export default productRouter;
