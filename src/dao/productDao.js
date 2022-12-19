import productModel from "../models/product.js";

//Crear producto
const createProduct = async (object) => {
  try {
    return await productModel.create(object);
  } catch (error) {
    return { Mensaje: `Error: ${error}` };
  }
};

//Mostrar producto por ID
const getProduct = async (id) => {
  try {
    return await productModel.findById(id).lean();
  } catch (error) {
    return { Mensaje: `Error: ${error}` };
  }
};

//Mostrar todos los productos
const getAll = async () => {
  try {
    return await productModel.find();
  } catch (error) {
    return { Mensaje: `Error: ${error}` };
  }
};

//Borrar producto por ID
const deleteProduct = async (id) => {
  try {
    await productModel.findByIdAndDelete(id).lean();
    return { Mensaje: 'El producto fue borrado'}
  } catch (error) {
    return { Mensaje: `Error: ${err}` };
  }
};

//Actualizar un producto
const updateProduct = async (id, object) => {
  try {
    return await productModel.findOneAndUpdate({ _id: id }, { ...object });
  } catch (error) {
    return { Mensaje: `Error: ${error}` };
  }
};

export { createProduct, getProduct, getAll, deleteProduct, updateProduct };
