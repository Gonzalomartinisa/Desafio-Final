import { 
  serviceCreateProduct, 
  serviceGetAll, 
  serviceGetProduct, 
  serviceDeleteProduct, 
  serviceUpdateProduct,  
} from '../services/products.services.js';

//Crear unn producto
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
    // console.log(productos)
  } catch (error) {
    console.error(error);
    res.send('No se encontro el producto')
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
  }
};

//Borrar producto por la ID
const deleteProductCont = async (req, res) => {
  try {
    const { id } = req.params;
    await serviceDeleteProduct(id);
    res.send('El producto fue borrado');
  } catch (error) {
    console.error(error);
  }
};


//Actualilar producto por la ID
const updateProductCont = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const product = await serviceUpdateProduct(id, data);
    res.send('El producto fue actualizado');
  } catch (error) {
    console.error(error);
  }
};

export default { 
  addProducts, 
  getAllProducts, 
  getProductCont, 
  deleteProductCont,
  updateProductCont,
};
