
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
    res.json({
      message: "Bad Request",
      errors: err.errors
    })
    })
router.post('/:reviewId/images',requireAuth,async (req,res)=>{
    if(!await Review.findByPk(req.params.reviewId)){
        res.status(404)
        .setHeader('Content-Type','application/json')
        .json({
            message: "Review couldn't be found"
          })
    }
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
    let test=await Review.findOne({
        where: {
            userId:req.user.id,
            id: req.params.reviewId
        }
    })
    if (test){
       let goal= await ReviewImage.create({
            reviewId:req.params.reviewId,
            url:req.body.url
        })
        res.status(200)
        .setHeader('Content-Type','application/json')
        .json({
            id:goal.id,
            url:goal.url
        })
    }
})
router.get('/current',requireAuth,async(req,res)=>{
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

// router.get('/:spotId/reviews',async (req,res)=>{
//     req.params.spotId
//     let test=Review.findAll({
//         where: {
//            spotId:req.params.spotId
//         },
//         include: {[
//             {model: User,
//             attributes: ['id','firstName','lastName']},
//             {model:ReviewImage,
//             attributes: ['id','url']}
//         ]}
//     })
//     res.status(200)
//     .setHeader('Content-Type','application/json')

// })

module.exports=router
