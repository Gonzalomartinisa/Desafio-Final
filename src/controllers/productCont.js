import { 
  serviceCreateProduct, 
  serviceGetAll, 
  serviceGetProduct, 
  serviceDeleteProduct, 
  serviceUpdateProduct,  
} from '../services/products.services.js';

  const addProducts = async (req, res, next) => {
    try {
      const product = req.body;
      await serviceCreateProduct(product); 
    } catch (error) {
      console.error(error);
      res.send(error);
    }
};

const getProductCont = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await serviceGetProduct(id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.send("El producto no existe");
  }
};

const getAllProducts = async (req, res) => {
  try {
    const arrayProducts = await serviceGetAll();
    res.render('products', { arrayProducts: arrayProducts });
  //   res.json(product);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

const deleteProductCont = async (req, res) => {
  try {
    const { id } = req.params;
    await serviceDeleteProduct(id);
    res.send('El producto fue borrado');
  } catch (error) {
    console.error(error);
  }
};

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
