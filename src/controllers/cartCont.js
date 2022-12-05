import {
  serviceCreateCart,
  serviceGetAllCart,
  serviceGetCartId,
  serviceDeletetCart,
  serviceSaveProductCart,
  serviceDeleteProductCart
} from "../services/cart.services.js";

//Crear carrito
const createCartCont = async (req, res) => {
  try {
    const cart = await serviceCreateCart();
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

//Mostrar carrito por ID
const getCartCont = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await serviceGetCartId(id);
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.send("No se encontro el carrito");
  }
};

//Mostrar todos los carritos
const getAllCartCont = async (req, res) => {
  try {
    const arrayCart = await serviceGetAllCart();
    res.render("carrito", { arrayCart: arrayCart });
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

//Borrar carrito por ID
const deleteProductCont = async (req, res) => {
  try {
    const { id } = req.params;
    await serviceDeletetCart(id);
    res.send("El carrito fue borrado");
  } catch (error) {
    console.error(error);
    es.send("No se encontro el carrito");
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
    res.json(error);
  }
};

const deleteProductCartCont = async (req, res) => {
  try {
    const { id_prod } = req.params;
    const { id } = req.params;
    const carrito = await serviceDeleteProductCart(id_prod, id);
    res.json(carrito);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
};

export default {
  createCartCont,
  getAllCartCont,
  saveProductCartCont,
  deleteProductCont,
  getCartCont,
  deleteProductCartCont
};
