const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage,User,Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const e = require('express');
const spot = require('../../db/models/spot');
const booking = require('../../db/models/booking');
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

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Email or username is required"),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage("Password is required"),
    handleValidationErrors
];
const catchAuthoError=(err,req,res,next)=>{
    res.status(403)
    .setHeader('Content-Type','application/json')
    .json({
        message: "Forbidden"
      })
    }
    const makeError = (status, message, res,data = {}) => {
        return res.status(status).json({ message, ...data });
      };


router.delete('/:imageId',requireAuth,authError,async (req,res)=>{
    let test=await SpotImage.findOne({
        where: {id:req.params.imageId},
        include: [
            {
            model:Spot,
        attributes:['ownerId'],
    },
   ],
})
    if(!test){
        return makeError(404,"Spot Image couldn't be found",res)
      }
      else if(test && test.Spot.ownerId !==req.user.id){
        return next(err)
      }
      else {
        let destroyer=await SpotImage.destroy({
            where: {id:req.params.imageId},
        })
        res.status(200)
        .setHeader('Content-Type','application/json')
        .json({
            message: "Successfully deleted"
          })
      }
},catchAuthoError)



    module.exports=router
