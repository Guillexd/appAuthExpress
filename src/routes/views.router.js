import { Router } from "express";
import { isLogged, isntLogged } from "../middleware/login.middleware.js";

const router = Router();

router.get("/login", isntLogged, (req, res) => {
  res.render("login", { title: "Login" });
});

router.get("/register", isntLogged, (req, res) => {
  res.render("register", { title: "Register" });
});

router.get("/change-password", isntLogged, (req, res) => {
  res.render("changePassword", { title: "Change-Password" });
});

router.get("/error-login", isntLogged, (req, res) => {
  res.render("errorLogin", { title: "Error-Login" });
});

router.get("/error-register", isntLogged, (req, res) => {
  res.render("errorRegister", { title: "Error-Register" });
});

router.get("/jwt", (req, res) => {
  res.render("jwt", { title: "JWT" });
});

export default router;
