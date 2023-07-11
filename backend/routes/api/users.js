const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Invalid email'),

    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 2 })
      .withMessage('Username is required'),

      check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),

  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),

    handleValidationErrors
  ];

  router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const errors=validationResult(req);
      if(!errors.isEmpty()){
        let newBag={}
        let target=errors.array()
        for (let ele of target){
          newBag.ele.param=ele.msg
        }
       res.status(400);
       return res.json({message: "Bad Request", errors:newBag })
      }

      const { email, password, username,firstName,lastName } = req.body;
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


  module.exports = router;
