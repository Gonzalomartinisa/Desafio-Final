import productModel from "../models/product.js";

//Crear producto
    const createProduct = async (object) => {
        try {
            return await productModel.create(object)
        } catch (error) {
            console.error(error);
            return false;
        }
    };

//Mostrar producto por ID
    const getProduct = async (id) => {
        try {
            return await productModel.findById(id);
        } catch (error) {
            console.log(error);
            return false
        }
    };

//Mostrar todos los productos
    const getAll = async () => {
        try {
            return await productModel.find();
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    //Borrar producto por ID
    const deleteProduct = async (id) => {
        try {
            return await productModel.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
        }
    };

//Actualizar un producto
    const updateProduct = async (id, object) => {
        try {
            await productModel.findOneAndUpdate({_id: id}, {...object});
        } catch (error) {
            console.log(error);
            return false;
        }
    };

export { createProduct, getProduct, getAll, deleteProduct, updateProduct };
