export const isAuth = (req, res, next) =>
  req.isAuthenticated() ? next() : res.render("login")
