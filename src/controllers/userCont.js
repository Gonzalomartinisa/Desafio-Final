import {serviceCreateUser} from '../services/user.services.js';

//Crear usuario
const addUserCont = async (req, res) => {
    try {
      const user = req.body;
      const newUser = await serviceCreateUser(user); 
      res.render(newUser);
    } catch (error) {
      console.error(error);
      res.send(error);
    }
};

//Cerrar sesion
const logoutUserCont = async (req, res) =>{
  try {
    req.session.destroy(function(err){
      if (err){
        return next(err);
      }
      res.redirect("/");
    });
  } catch (error) {
    console.error(error);
  }
}
 
export default {addUserCont, logoutUserCont};