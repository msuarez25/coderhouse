export function auth(req, res, next) {
  if (req.session.login) {
    next();
  } else {
    return res.redirect('/login');
  }
}
