const logger = (req, res, next) => {
  // const isAdmin = false; // your are not admin
  const isAdmin = true; // your are admin
  if (isAdmin) {
    next();
  } else {
    res.status(401).json({
      error: 401,
      descripcion: 'Necesitas permisos de administrador para esta url',
    });
  }
};
export default logger;
