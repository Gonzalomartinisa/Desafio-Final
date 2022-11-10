const { createCart, getCart, getAllCart, saveProductCart } = require('../dao/cartDao');

const createCartCont = (req, res) => {
    try {
      const cart = createCart()
      cart.save()
      res.json(cart)
    } catch (error) {
      console.error(error)
      res.send(error);
    }
  };

  const getCartCont = async (req, res) => {
    try {
      const { id } = req.params;
      const cart = await getCart(id);
      res.json(cart)
    } catch (error) {
      console.error(error)
      res.send("No se encontro el carrito");
    }
  }

  const getAllCartCont = async (req, res) => {
    try {
      const arrayCart = await getAllCart();
      res.render('carrito', { arrayCart: arrayCart });
    } catch (error) {
      console.error(error)
      res.send(error);
    }
  };

  const saveProductCartCont = (req, res) => {
        try {
          const { body } = req.body;
          const { id } = req.params;
          const carrito = saveProductCart(body, id);
          res.json(carrito);
        } catch (error) {
          console.error(error)
          res.json(error);
        }
      };

  module.exports = { createCartCont, getAllCartCont, saveProductCartCont, getCartCont };
