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
      .withMessage('Please provide a valid email.'),

    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 2 })
      .withMessage('Please provide a username with at least 4 characters.'),

    handleValidationErrors
  ];

  router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const errors=validationResult(req);
      if(!errors.isEmpty()){
       res.status(400);
       return res.json({errors: errors.array()})
      }

      const { email, password, username,firstName,lastName } = req.body;
      let check= await User.findOne({
        where: {email:email }
      })
      if (check) {
        res.status(500)
        throw new Error('Error. This Email Already Exists')

      }
      let check2= await User.findOne({
        where: {username:username }
      })
      if (check2) {
        res.status(500)
        throw new Error('Error.  This Username already exists')

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
