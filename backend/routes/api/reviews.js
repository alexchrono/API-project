

const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');


const { setTokenCookie, restoreUser,requireAuth } = require('../../utils/auth');
const { Spot,SpotImage,Review, User,ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const e = require('express');
const spot = require('../../db/models/spot');
const router = express.Router();
const middleware2=((err,req,res,next)=>{
    res.status(400)
    .setHeader('Content-Type','application/json')
    .json({
      message: "Bad Request",
      errors: err.errors
    })
    })
const catchAuthError=(err,req,res,next)=>{
res.status(403)
.setHeader('Content-Type','application/json')
.json({
    message: "Forbidden"
  })
}
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
        check('review')
            .exists({ checkFalsy: true })
            .notEmpty()
            .withMessage("Review text is required"),
            check('stars')
            .exists({ checkFalsy: true })
            .isIn([1, 2, 3, 4, 5])
            .withMessage("Stars must be an integer from 1 to 5"),
        handleValidationErrors
    ]


router.post('/:reviewId/images',requireAuth,authError,async (req,res)=>{
    let test2=await Review.findByPk(req.params.reviewId)
    if(!test2 ){
        res.status(404)
        .setHeader('Content-Type','application/json')
        .json({
            message: "Review couldn't be found"
          })
    }
    else if(test2 && test2.userId===req.user.id){


    let count=await ReviewImage.count({
        where: {
           reviewId:req.params.reviewId
        }


    })
    if (count>=10){
        res.status(403)
        .setHeader('Content-Type','application/json')
        .json({
            "message": "Maximum number of images for this resource was reached"
          })
    }


       let goal= await ReviewImage.create({
            reviewId:req.params.reviewId,
            url:req.body.url
        })
        res.status(200)
        .setHeader('Content-Type','application/json')
        .json({
            id:goal.id,
            url:goal.url
        })}
        else if(test2 && test2.userId!==req.user.id){
            next(err)
        }
},catchAuthError)




router.get('/current',requireAuth,authError,async(req,res)=>{
    let goal=await Review.findAll({


        where: {userId:req.user.id},
        include: [{model:User,
        attributes: ['id','firstName','lastName']},
            {model: Spot,
            attributes: {
                exclude: ['description','createdAt','updatedAt']
            },
            include: [
            {model: SpotImage,
            attributes: ['url']}]},
            {model:ReviewImage,
            attributes: ['id','url']}


             ]
    })
    if(goal){
    let newArray=[]
    goal.forEach((ele)=>{
        newArray.push(ele.toJSON())


    })


     newArray.forEach((ele2)=>{
       ele2.Spot.previewImage=ele2.Spot.SpotImages[0].url
       delete ele2.Spot.SpotImages
    // let goal
    // if (ele2.SpotImages){
    //  goal=ele2.SpotImages.url}
    //     console.log(goal)


    // }) //comment this back in


    // goal.forEach((ele)=>{
    //     let temp1=ele.
    })


    res.status(200)
    .setHeader('Content-Type','application/json')
    .json({Reviews: newArray})
}
else  {
    res.status(400)
    .setHeader('Content-Type','application/json')
    .json({message: 'You do not own any properties'})
}






})
router.put('/:reviewId',requireAuth,authError,validateLogin,middleware2,async(req,res)=>{
let testReview=await Review.findByPk(req.params.reviewId)
if(!testReview){
    res.status(404)
    .setHeader('Content-Type','application/json')
    .json({
        message: "Review couldn't be found"
      })
}
else if(testReview && testReview.userId===req.user.id){
const {review,stars}=req.body
testReview.review=review
testReview.stars=stars
testReview.updatedAt=Date.now()
res.status(200)
.setHeader('Content-Type','application/json')
.json(testReview)
}
else {
next(err)
}
},catchAuthError)


router.delete('/:reviewId',requireAuth,authError,async (req,res,next)=>{
    let test=await Review.findByPk(req.params.reviewId)
    if(!test){
        res.status(404)
        .setHeader('Content-Type','application/json')
        .json(
            {
                message: "Review couldn't be found"
              }
        )
    }


    else if(test && test.userId==req.user.id){
        Review.destroy({
            where: {
                id:req.params.reviewId
            }
        })
        res.status(200)
        .setHeader('Content-Type','application/json')
        .json({
            message: "Successfully deleted"
          })
    }
     else if(test && test.userId !==req.user.id){
        next(err)
    }




},catchAuthError)






module.exports=router
