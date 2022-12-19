import {
  serviceCreateCart,
  serviceGetAllCart,
  serviceGetCartId,
  serviceDeletetCart,
  serviceSaveProductCart,
  serviceDeleteProductCart,
  serviceGetAllProductsCart,
} from "../services/cart.services.js";

//Crear carrito
const createCartCont = async (req, res) => {
  try {
    const cart = await serviceCreateCart();
    res.json(cart);
  } catch (error) {
    console.error(error);
  }
};

//Mostrar carrito por ID
const getCartCont = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await serviceGetCartId(id);
    res.json(cart);
  } catch (error) {
    console.log("No se encontro el carrito", error);
  }
};

//Mostrar todos los carritos
const getAllCartCont = async (req, res) => {
  try {
    const arrayCart = await serviceGetAllCart();
    res.render("carro", { arrayCart: arrayCart });
  } catch (error) {
    console.error(error);
    res.json("No se encontraron los carritos");
  }
};

//Borrar carrito por ID
const deleteProductCont = async (req, res) => {
  try {
    const { id } = req.params;
    await serviceDeletetCart(id);
    res.json("El carrito fue borrado");
  } catch (error) {
    console.error(error);
    res.json("No se encontro el carrito");
  }
};

//Guardar productos en el carrito
const saveProductCartCont = async (req, res) => {
  try {
    const { id_prod } = req.params;
    const { id } = req.params;
    const carrito = await serviceSaveProductCart(id_prod, id);
    res.json(carrito);
  } catch (error) {
    console.error(error);
    res.json("No se encontro el carrito");
  }
};

//Borrar productos del carro
const deleteProductCartCont = async (req, res) => {
  try {
    const { id_prod } = req.params;
    const { id } = req.params;
    const carrito = await serviceDeleteProductCart(id_prod, id);
    res.json(carrito);
  } catch (error) {
    console.error(error);
  }
};

//Traer todo lo que esta en el carro
const getProductCartId = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await serviceGetAllProductsCart(id);
    // res.render("carro", {products: products});
  } catch (error) {
    console.error(error);
    res.send("No se encontro el carrito");
  }
};

export default {
  createCartCont,
  getAllCartCont,
  saveProductCartCont,
  deleteProductCont,
  getCartCont,
  deleteProductCartCont,
  getProductCartId,
};
