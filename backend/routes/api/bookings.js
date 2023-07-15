const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage,User,Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const e = require('express');
const spot = require('../../db/models/spot');
const router = express.Router();


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

router.get('/current',requireAuth,async (req,res)=>{
    let goal=await Booking.findAll({
        where: {userId:req.user.id},
        include: {model:Spot,
        attributes: {
            exclude: ['description','createdAt','updatedAt']
        },
    include: {model:SpotImage,
    attributes:['url']}
    }

    })

    if(goal){
        let newArray=[]
        goal.forEach((ele)=>{
            newArray.push(ele.toJSON())

        })

         newArray.forEach((ele2)=>{
           ele2.Spot.previewImage=ele2.Spot.SpotImages[0].url
           delete ele2.Spot.SpotImages
         })

         let newBookings=[]
         for (let ele of newArray){
            let newBody={}
            newBody.id=ele.id
            newBody.spotId=ele.spotId
            newBody.Spot=ele.Spot
            newBody.userId=ele.userId
            newBody.startDate=ele.startDate
            newBody.endDate=ele.endDate
            newBody.createdAt=ele.createdAt
            newBody.updatedAt=ele.updatedAt
            newBookings.push(newBody)
         }

         res.status(200)
         .setHeader('Content-Type','application/json')
         .json({Bookings: newBookings})


        }


})
router.put('/:bookingId',requireAuth,async (req,res)=>{
    let {startDate,endDate}=req.body
    let test= await Booking.findByPk(req.params.bookingId)
    if(!test){
        res.status(404)
        .setHeader('Content-Type','application/json')
        .json({
            message: "Booking couldn't be found"
          })
    }
    else if(test && test.userId!==req.user.id){
        next(err)
    }
    else if(test && test.userId===req.user.id){
        test.startDate=startDate;
        test.endDate=endDate
        test.updatedAt= new Date()
        await test.save()
        res.status(200)
        .setHeader('Content-Type','application/json')
        .json(test)
    }


},catchAuthoError)

    module.exports=router
