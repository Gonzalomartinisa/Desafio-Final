import { 
  serviceCreateProduct, 
  serviceGetAll, 
  serviceGetProduct, 
  serviceDeleteProduct, 
  serviceUpdateProduct,  
} from '../services/products.services.js';

//Crear un producto
  const addProducts = async (req, res) => {
    try {
      const product = req.body;
      await serviceCreateProduct(product); 
    } catch (error) {
      console.error(error);
      res.send(error);
    }
};

//Mostrar un producto
const getProductCont = async (req, res) => {
  try {
    const { id } = req.params;
    const productos = await serviceGetProduct(id);
    // res.render('product', { productos: productos });
    res.json(productos);
  } catch (error) {

    console.log('No se encontro el producto', error)
  }
};

//Mostrar todos los productos
const getAllProducts = async (req, res) => {
  try {
    const arrayProducts = await serviceGetAll();
    res.render('products', { arrayProducts: arrayProducts });
    // res.json(product);
  } catch (error) {
    console.error(error);
    res.json('No se encontraron los productos');
  }
};

//Borrar producto por la ID
const deleteProductCont = async (req, res) => {
  try {
    const data = req.params.id;
    await serviceDeleteProduct(data);
    res.json('El producto fue borrado');
  } catch (error) {
    console.error(error);
    res.json('No se encontro el producto');
  }
};


//Actualizar producto por la ID
const updateProductCont = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const product = await serviceUpdateProduct(id, data);
    res.json(product);
  } catch (error) {
    console.log('No se encontro el producto o no pudo ser actualizado', error);
  }
};

export default { 
  addProducts, 
  getAllProducts, 
  getProductCont, 
  deleteProductCont,
  updateProductCont,
};
