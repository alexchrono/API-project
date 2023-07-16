const express = require('express');
const { Op, DATEONLY } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage,User,Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const e = require('express');
const spot = require('../../db/models/spot');
const router = express.Router();
let validateNoBookings=[(req,res,next)=>{
    let startDate= new Date(req.body.startDate)
    let endDate= new Date(req.body.endDate)
        if(startDate>endDate){
           res.status(400)
          .setHeader('Content-Type','application/json')
          .json(
          {
            message: "Bad Request",
            errors: {
              endDate: "endDate cannot come before startDate"
            }
          })
        }
        else {
            next()
        }
    }]
let validateStartDate=[(req,res,next)=>{
    let startDate= new Date(req.body.startDate)
    let endDate= new Date(req.body.endDate)
        if(startDate>endDate){
           res.status(400)
          .setHeader('Content-Type','application/json')
          .json(
          {
            message: "Bad Request",
            errors: {
              endDate: "endDate cannot come before startDate"
            }
          })
        }
        else {
            next(req,res)
        }
    }


];
// const validateStartDate = [
//     check('credential')
//         .exists({ checkFalsy: true })
//         .notEmpty()
//         .withMessage("Email or username is required"),
//     check('password')
//         .exists({ checkFalsy: true })
//         .withMessage("Password is required"),
//     handleValidationErrors
// ];
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

const makeError = (status, message, res,data = {}) => {
    return res.status(status).json({ message, ...data });
  };

router.put('/:bookingId',requireAuth,async (req,res)=>{
    let {startDate,endDate}=req.body
    let tstartDate=new Date(startDate)
    let tendDate= new Date(endDate)
    let today= new Date()
    let test= await Booking.findByPk(req.params.bookingId)

    //check
    if(!test){
      return makeError(404,"Booking couldn't be found",res)
    }
    //

    if(test.userId!==req.user.id){
        res.status(403).json({
            message: 'Forbidden'
        })
    }
    else if(tstartDate<today ||tendDate<today ){
        res.status(403)
        .setHeader('Content-Type','application/json')
        .json({
            message: "Past bookings can't be modified"
          })
    }
    else if(tendDate<tstartDate){
        res.status(400)
        .setHeader('Content-Type','application/json')
        .json(
                {
                  message: "Bad Request",
                  errors: {
                    endDate: "endDate cannot come before startDate"
                  }
                })
        }


    else if(test && test.userId===req.user.id){


    let datesToCheckStart= await Booking.findAll({
        where: {
            spotId:test.spotId,

            startDate: {
                [Op.between]: [tstartDate,tendDate]
            }}})
    let datesToCheckEnd= await Booking.findAll({
        where: {
            spotId:test.spotId,

            endDate: {
                [Op.between]: [tstartDate,tendDate]
            }}})


    if (datesToCheckStart.length===0 && datesToCheckEnd.length===0){
        test.startDate=startDate;
        test.endDate=endDate
        test.updatedAt= new Date()
        await test.save()
        res.status(200)
        .setHeader('Content-Type','application/json')
        .json(test)

    }
    else if(datesToCheckStart.length>0 && datesToCheckEnd.length===0){
        res.status(403)
        .setHeader('Content-Type','application/json')
        res.json({message: "Sorry, this spot is already booked for the specified dates",
            errors: {
              endDate: "End date conflicts with an existing booking",
            }
          })

    }
    else if(datesToCheckEnd.length>0 && datesToCheckStart.length===0){
        res.status(403)
        .setHeader('Content-Type','application/json')
        res.json({message: "Sorry, this spot is already booked for the specified dates",
            errors: {

                startDate: "Start date conflicts with an existing booking",

            }
          })

    }
    else{
        res.status(403)
        .setHeader('Content-Type','application/json')
        .json({message: "Sorry, this spot is already booked for the specified dates",
            errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking",
            }
          })

    }


    }









})
router.delete('/:bookingId',requireAuth,async(req,res)=>{
let test= await Booking.findByPk(req.params.bookingId)
if(!test){
    return makeError(404,"Booking couldn't be found",res)
  }
if(test.userId!==req.user.id){
    res.status(403).json({
        message: 'Forbidden'
    })
}
let testStartDate=new Date(test.startDate).toISOString()
let tester=new Date().toISOString()

if(testStartDate<=tester){
    res.status(400)
    .setHeader('Content-Type','application/json')
    .json({
        message: "Bookings that have been started can't be deleted"
      })
}
else {
    await Booking.destroy({
        where: {id:req.params.bookingId}
    })

    res.status(200)
    .setHeader('Content-Type','application/json')
    .json({
        message: "Successfully deleted"
      })
}
})

    module.exports=router
