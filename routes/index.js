const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController.js');
const userController = require('../controllers/userController.js');
const authController = require('../controllers/authController.js');
const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));
router.get('/add', authController.isLoggedIn, storeController.addStore);

router.post('/add', 
  storeController.upload, 
  catchErrors(storeController.resize), 
  catchErrors(storeController.createStore)
);

router.post('/add/:id', catchErrors(storeController.updateStore));

router.get('/stores/:id/edit', catchErrors(storeController.editStore));
router.get('/store/:slug', catchErrors(storeController.getStoreBySlug));

router.get('/tags', catchErrors(storeController.getStoresByTag));
router.get('/tags/:tag', catchErrors(storeController.getStoresByTag));

router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/register', userController.registerForm);

// 1. validate registration data
// 2. register user
// 3. log them in
router.post('/register', 
  userController.validateRegister,
  userController.register,
  authController.login,
);

router.get('/logout', authController.logout);

router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', catchErrors(userController.updateAccount));
router.post('/account/forgot', catchErrors(authController.forgot));
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token', 
  authController.confirmedPasswords, 
  catchErrors(authController.update)
);

router.get('/reverse/:name',(req,res) =>{
  const reverse = [...req.params.name].reverse().join('');
  res.send(reverse);
})

module.exports = router;
