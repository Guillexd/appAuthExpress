export const isntLogged = (req, res, next) => {
  if(req.session.logged) res.redirect('/api/products');
  else next();
}

export const isLogged = (req, res, next) => {
  if(req.session.logged) next();
  else res.redirect('/view/login');
}