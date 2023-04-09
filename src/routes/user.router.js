import { Router } from "express";
import UserManager from "../persistencia/daos/user.manager.js";
import { comparePasswords, hashPassword } from "../utils.js";
import passport from "passport";

const router = Router();
const userManager = new UserManager();

router.get("/login", async(req, res) => {

  const user = await userManager.getUser(req.body);

  if(user.length){
    const isPassword = await comparePasswords(req.body.password, user[0].password);

    if (!isPassword) return res.redirect('/view/error-login');

    for (const key in req.body) {
      req.session[key] = req.body[key]
    }
    req.session.logged = true;

    if(user[0].email === 'adminCoder@coder.com' && user[0].password === 'adminCod3r123'){
      req.session.isAdmin = true
    } else {
      req.session.isAdmin = false
    }
    
    res.redirect('/api/products');
  }
  else{
    res.redirect('/view/error-login');
  }
});

//passport-github githubLogin
router.get("/login-github", passport.authenticate('githubLogin', { scope: [ 'user:email'] }));
router.get('/github-login', passport.authenticate('githubLogin', {
  failureRedirect: '/view/error-login'
}), async(req, res) => {
  req.session.email = req.user.email;
  req.session.logged = true;
  res.redirect('/api/products');
})

//passport-github githubRegister
router.get("/register-github", passport.authenticate('githubRegister', { scope: [ 'user:email'] }));
router.get('/github-register', passport.authenticate('githubRegister', {
  failureRedirect: '/view/error-register'
}), async(req, res) => {
  req.session.email = req.user.email;
  req.session.logged = true;
  res.redirect('/api/products');
})

//passport-google googleLogin
router.get("/login-google", passport.authenticate('googleLogin', { scope: [ 'email', 'profile' ] }));
router.get('/google-login', passport.authenticate('googleLogin', {
  failureRedirect: '/view/error-login'
}), (req, res) => {
  req.session.email = req.user.email;
  req.session.logged = true;
  res.redirect('/api/products');
})

//passport-google googleRegister
router.get("/register-google", passport.authenticate('googleRegister', { scope: [ 'email', 'profile' ] }));
router.get('/google-register', passport.authenticate('googleRegister', {
  failureRedirect: '/view/error-register'
}), (req, res) => {
  req.session.email = req.user.email;
  req.session.logged = true;
  res.redirect('/api/products');
})

router.post("/register", async(req, res) => {
  const password = await hashPassword(req.body.password)
  const newData = {...req.body, password};
  const newUser = await userManager.addUser(newData);
  if(newUser)res.redirect('/view/login');
  else res.redirect('/view/error-register');
});

router.get("/logout", (req, res) => {
  req.session.destroy(err=>{
    if(err) console.log(err);
    else res.redirect('/view/login');
  })
});

router.post("/change-password", async(req, res) => {
  const newPassword = await userManager.changePassword(req.body);
  if(newPassword) return res.redirect('/view/login');
  else res.redirect('/view/error-register');
})

export default router;
