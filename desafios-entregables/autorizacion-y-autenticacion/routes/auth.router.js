import express from 'express';
import passport from '../utils/passport.util.js';
import * as AuthController from '../controllers/auth.controller.js';
// import * as AuthMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                                   signup                                   */
/* -------------------------------------------------------------------------- */

router.get('/register', AuthController.getSignup);
router.post(
  '/register',
  passport.authenticate('signup', { failureRedirect: '/failSignup' }),
  AuthController.postSignup
);
router.get('/failSignup', AuthController.failSignup);

/* -------------------------------------------------------------------------- */
/*                                    login                                   */
/* -------------------------------------------------------------------------- */

router.get('/login', AuthController.getLogin);
router.post(
  '/login',
  passport.authenticate('login', { failureRedirect: '/failLogin' }),
  AuthController.postLogin
);
router.get('/failLogin', AuthController.failLogin);

/* -------------------------------------------------------------------------- */
/*                                   logout                                   */
/* -------------------------------------------------------------------------- */

router.get('/logout', AuthController.logout);

export default router;
