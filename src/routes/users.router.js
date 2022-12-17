import { Router } from "express";
const routerUsers = Router();
import passport from "../components/passportLocal.js";
import controlerCreateUser from '../controllers/userCont.js';
import controlerLogoutUser from '../controllers/userCont.js';


routerUsers.post("/", controlerCreateUser.addUserCont);
routerUsers.get("/logout", controlerLogoutUser.logoutUserCont);
routerUsers.get("/", (req, res) => res.render("index"));

routerUsers.get("/signup", (req, res) => {res.render("signup")});

routerUsers.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/registro",
    failureRedirect: "/",
    passReqToCallback: true,
  }),
);

routerUsers.get("/registro", isAuthenticated, (req, res) => {
  res.render("registro", {
    usuario: "El usuario ha sido registrado con exito",
  });
});

routerUsers.get("/failsignup", isAuthenticated, (req, res) => {
  res.send("Ya exsite un usuario con ese nombre");
});

routerUsers.get("/loguin", isAuthenticated, (req, res) => {
  res.render("loguin");
});

routerUsers.post(
  "/loguin",
  passport.authenticate("local-loguin", {
    successRedirect: "/",
    failureRedirect: "/",
    passReqToCallback: true,
  }),
);

routerUsers.get("/userlog", isAuthenticated, (req, res) => {
  res.send("El usuario se ha logueado correctamente");
});

routerUsers.get("/failloguin", isAuthenticated, (req, res) => {
  res.send("Nombre o contraseña incorretas");
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};

export default routerUsers;
