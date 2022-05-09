// import path from 'path';

/* -------------------------------------------------------------------------- */
/*                                   signup                                   */
/* -------------------------------------------------------------------------- */

export function getSignup(req, res) {
  // res.sendFile(path.resolve() + '/src/views/signup.html');
  res.render('register');
}

export function postSignup(req, res) {
  const user = req.user;
  console.log(user);
  // res.sendFile(path.resolve() + '/src/views/login.html');
  res.render('login');
}

export function failSignup(req, res) {
  console.log('Error en el registro');
  res.render('signup-error', {});
}

/* -------------------------------------------------------------------------- */
/*                                    login                                   */
/* -------------------------------------------------------------------------- */

export function getLogin(req, res) {
  console.log('getLogin: ', req.user);
  if (req.isAuthenticated()) {
    const user = req.user;
    console.log('Usuario logueado!');
    res.redirect('/');
  } else {
    console.log('Usuario no loggeado!"');
    // res.sendFile(path.resolve() + "/src/views/login.html");
    res.render('login');
  }
}
export function postLogin(req, res) {
  const user = req.user;
  const nombre = user.firstName;
  const email = user.email;
  res
    .clearCookie('user')
    .cookie('user', { nombre, email }, { maxAge: 600000, signed: true })
    .redirect('/');
}

export function failLogin(req, res) {
  console.log('Error en el login');
  res.render('login-error', {});
}

/* -------------------------------------------------------------------------- */
/*                                   logout                                   */
/* -------------------------------------------------------------------------- */

export function logout(req, res) {
  console.log('logout');
  const nombre = req.signedCookies.user.nombre;
  req.logout();
  // res.sendFile(path.resolve() + '/src/views/login.html');
  res.clearCookie('user').render('bye', { nombre });
}
