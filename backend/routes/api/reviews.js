
const { requireAuth } = require('../../utils/auth');
const { Review,Spot,User,ReviewImage} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const express = require('express');

const router = express.Router();

router.get('/current',requireAuth,async(req,res)=>{
    let goal=await Review.findAll({

        where: {userId:req.user.id},
        include: [{model:User,
        attributes: ['id','firstName','lastName']},
            {model: Spot,
            attributes: {
                exclude: ['description','createdAt','updatedAt']
            }},

             ]
    })

    res.status(200)
    .setHeader('Content-Type','application/json')
    .json({goal})
})

module.exports=router
