const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];

/*const validateLogin2 = [
  check('credential')
  .notEmpty(),
  check('password')
  .notEmpty()
] */

const invalidCredentials = (err, req, res, next) => {

  if(err.status===401){
    res.status(401);
    res.setHeader('Content-Type', 'application/json');
    res.json({
      message: "Invalid credentials"
    });
  }
  else {
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.json({
      message: "Bad Request",
      errors: {
        credential: "Email or username is required",
        password: "Password is required"
      }
    })
  }
};
  let invalidCredentials2=((err,req,res,next)=>{

    next(err)
  })

  router.post(
    '/',
    validateLogin,invalidCredentials,
    async (req, res, next) => {
        const { credential, password } = req.body;

        // let resBody={}
        // if(!password && !credential){
        //   resBody.credential="Email or username is required"
        //   resBody.password="Password is required"
        //   return next(err)
        // }
        // if(!password){
        //   resBody.password="Password is required"
        //   return next(err)
        // }
        // if(!credential){
        //   resBody.credential="Email or username is required"
        //   return next(err)
        // }
        const user = await User.unscoped().findOne({
            where: {
                [Op.or]: {
                    username: credential,
                    email: credential,
                }
            }
        });

      if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = { credential: 'The provided credentials were invalid.' };

        return next(err);
      }



      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,

      };

      await setTokenCookie(res, safeUser);

      return res.json({
        user: safeUser
      });
    }
  );

  router.use(invalidCredentials)



  router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );
  router.get(
    '/',
    (req, res) => {
      const { user } = req;
      if (user) {
        const safeUser = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
        };
        return res.json({
          user: safeUser
        });
      } else return res.json({ user: null });
    }
  );


module.exports = router;
