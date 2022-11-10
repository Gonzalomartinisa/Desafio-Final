const { createProduct, getAll, getProduct, existProduct } = require('../dao/productDao')

  const addProducts = async (req, res, next) => {
    try {
      const product = await createProduct(req.body);
      product.save();
    //   res.json(product);
    } catch (error) {
      console.error(error);
      res.send(error);
    }
};

const getProductCont = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProduct(id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.send("El producto no existe");
  }
}

const getAllProducts = async (req, res, next) => {
  try {
    const arrayProducts = await getAll();
    res.render('products', { arrayProducts: arrayProducts });
  //   res.json(product);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

module.exports = { addProducts, getAllProducts, getProductCont };
