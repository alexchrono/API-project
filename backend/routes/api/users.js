const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();
const authError = function (err, req, res, next) {
  res.status(401);
  res.setHeader('Content-Type','application/json')
  res.json(
      {
          message: "Authentication required"
        }
  );
};
const validateSignup= [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Invalid email'),

    check('username')
      .isLength({ min: 2 })
      .withMessage('Username has to be two characters or more'),


      check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),

  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),

    handleValidationErrors
  ];
// const middleware2=((err,req,res,next)=>{
// res.json({
//   message: "Bad Request",
//   errors: err.errors
// })
// })
  router.post(
    '/',
    validateSignup,
    async (req, res,next) => {
      const { email, password, username,firstName,lastName } = req.body;
      // const errors2=validationResult(req);
      // if(!errors2.isEmpty()){
      // next(errors2)
      //   }





      let check= await User.findOne({
        where: {email:email }
      })
      if (check) {
        res.status(500)
        res.setHeader('Content-Type','application/json')
        res.json({
          message: "User already exists",
  errors: {
    email: "User with that email already exists"
        }})

      }
      let check2= await User.findOne({
        where: {username:username }
      })
      if (check2) {
        res.status(500)
        res.setHeader('Content-Type','application/json')
        res.json({
          message: "User already exists",
  errors: {
    username: "User with that username already exists"
  }
        })
      }

      const hashedPassword =await bcrypt.hashSync(password);
      const user = await User.create({ email, username, hashedPassword,firstName,lastName });

      const safeUser = {
        id: user.id,
        firstName,
        lastName,
        email: user.email,
        username: user.username,

      };

      await setTokenCookie(res, safeUser);

      return res.json({
        user: safeUser
      });


  }
  );
  // router.use((err,req,res,next)=>{
  //   res.json({message: "Bad Request", errors:err.errors })
  // })

  module.exports = router;
