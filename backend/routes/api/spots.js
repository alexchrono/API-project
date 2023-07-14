const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage,User } = require('../../db/models');
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

const validateLogin2 = [
    check('address')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Country is required"),
    check('lat')
        .exists({ checkFalsy: true })
        .custom(value => !isNaN(value) && String(value).includes('.'))
        .withMessage("Latitude is not valid"),
    check('lng')
        .exists({ checkFalsy: true })
        .custom(value => !isNaN(value) && String(value).includes('.'))
        .withMessage("Longitude is not valid"),
    check('name')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isLength({ max: 50 })
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Description is required"),
    check('price')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Price per day is required"),

    handleValidationErrors
];

const validateLogin3 = [
    check('review')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Review text is required"),
    check('stars')
        .exists({ checkFalsy: true })
        .isIn([1, 2, 3, 4, 5])
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];

const displayValidationErrors = (err, req, res, next) => {

    res.status(400)
    res.setHeader('Content-Type', 'application/json')
    res.json({
        message: "Bad Request",
        errors: err.errors
    })
}
const displayValidationErrors2 = (err, req, res, next) => {

    res.status(404)
    res.setHeader('Content-Type', 'application/json')
    res.json({
        message: "Bad Request",
        errors: err.errors
    })
}
router.post('/:spotId/reviews', requireAuth, validateLogin3, displayValidationErrors, async (req, res) => {
    let { review, stars } = req.body
    if (! await Spot.findByPk(req.params.spotId)) {
         res.status(404)
            .setHeader('Content-Type', 'application/json')
            .json({
                message: `Spot couldn't be found`
            })
    }
    let test = await Review.findOne({
        where: {
            userId: req.user.id,
            spotId: req.params.spotId
        }
    })
    if (!test) {
        let test2 = await Review.create({
            userId: req.user.id,
            spotId: req.params.spotId,

            review,
            stars,

        })

        res.status(201)
            .setHeader('Content-Type', 'application/json')
        res.json(test2)
    }

    else {
        res.status(500)
            .setHeader('Content-Type', 'application/json')
            .json({
                message: "User already has a review for this spot"
            })
    }

})
router.post('/:spotId/images', requireAuth, async (req, res) => {
    let specId = req.params.spotId
    let { url, preview } = req.body
    let owner = req.user.id
    let testToFind = await Spot.findOne({
        where: {
            id: specId,
            ownerId: owner
        }
    })
    if (testToFind) {
        let newBag = await SpotImage.create({
            spotId: specId,
            url,
            preview
        })
        res.status(200)
        res.setHeader('Content-Type', 'application/json')
        let thingToFind = await SpotImage.findOne({
            where: { url: url },
            attributes: ['id', 'url', 'preview']
        })
        res.json(thingToFind)
    }
    else {
        res.status(404)
        res.setHeader('Content-Type', 'application/json')
        res.json({
            message: "Spot couldn't be found"
        })
    }
})
router.get('/:spotId/reviews',async (req,res)=>{

    let test=await Review.findAll({
        where: {
           spotId:req.params.spotId
        },
        attributes: ['id','userId','spotId','review','stars','createdAt','updatedAt'],
        include: [
            {model: User,
            attributes: ['id','firstName','lastName']},
            {model:ReviewImage,
            attributes: ['id','url']}
        ],
    })
    if(test.length>0){
    res.status(200)
    .setHeader('Content-Type','application/json')
    .json({Reviews: test})
    }
    else {
        res.status(404)
        .setHeader('Content-Type','application/json')
        .json({
            message: "Spot couldn't be found"
          })
    }
})
router.get('/current', requireAuth, async (req, res) => {

    let allSpots = await Spot.findAll({
        where: { ownerId: req.user.id },
        include: [
            {
                model: Review,
                attributes: ['stars']
            },
            {
                model: SpotImage,
                attributes: ['url']
            }]
    })

    // allSpots.toJson()
    let newArray = []
    allSpots.forEach((ele) => {

        newArray.push(ele.toJSON())
    })
    newArray.forEach((ele) => {
        let starsAmount = 0
        let starsCount = 0
        ele.Reviews.forEach((review) => {

            if (review.stars) {
                starsAmount += review.stars
                starsCount += 1
            }
        })
        if (starsAmount !== 0) {
            ele.avgRating = (starsAmount / starsCount)
        }
        else {
            ele.avgRating = 'This spot has no ratings'
        }
        delete ele.Reviews
    })
    newArray.forEach((ele) => {
        ele.SpotImages.forEach((spotimg) => {
            if (spotimg.url) {
                ele.previewImage = spotimg.url
            }
            else {
                ele.previewImage = 'no image for this spot'
            }

        });
        delete ele.SpotImages
    })

    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    res.json(newArray)
})

router.put('/:spotId', requireAuth, validateLogin2, displayValidationErrors, async (req, res) => {
    let { address, city, state, country, lat, lng, name, description, price } = req.body
    let targetSpot = await Spot.findOne({
        where: {
            ownerId: req.user.id,
            id: req.params.spotId
        }
    })
    if (targetSpot) {
        targetSpot.address = address,
            targetSpot.city = city,
            targetSpot.state = state,
            targetSpot.country = country,
            targetSpot.lat = lat,
            targetSpot.lng = lng,
            targetSpot.name = name,
            targetSpot.description = description,
            targetSpot.price = price,
            targetSpot.createdAt = targetSpot.createdAt
        targetSpot.updatedAt = Date.now();

        res.status(200)
        res.json(targetSpot)
    }

    else {
        res.status(404)
            .setHeader('Content-Type', 'application/json')
            .json({
                message: "Spot couldn't be found"
            })
    }
})

router.get('/:spotId', async (req, res) => {
    let realId = req.params.spotId
    let goal = await Spot.findByPk(realId, {
        include: [
            { model: Review },
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                where: { id: realId },
                attributes: ['id', 'firstName', 'lastName']
            }
        ]
    })
    if (goal) {
        let goal2 = [goal]
        let newArray = []

        goal2.forEach((ele) => {

            newArray.push(ele.toJSON())
        })
        newArray.forEach((ele) => {
            // console.log(ele)
            let starsAmount = 0
            let starsCount = 0
            ele.Reviews.forEach((review) => {

                if (review.stars) {
                    starsAmount += review.stars
                    starsCount += 1
                }
            })
            if (starsAmount !== 0) {
                ele.numReviews = starsCount
                ele.avgStarRating = (starsAmount / starsCount)
            }
            else {
                ele.numReviews = starsCount
                ele.avgStarRating = 'This spot has no ratings'
            }
            delete ele.Reviews;
            let temporary2 = ele.User
            delete ele.User
            let temporary = ele.SpotImages
            delete ele.SpotImages;
            ele.SpotImages = temporary
            ele.Owner = temporary2

        })
        let [stripped] = newArray
        res.status(200)
        res.setHeader('Content-Type', 'application/json')
        res.json(stripped)
    }
    else {
        res.status(404)
        res.setHeader('Content-Type', 'application/json')
        res.json({
            message: "Spot couldn't be found"
        })
    }
})
router.get('/', async (req, res) => {

    let allSpots = await Spot.findAll({
        include: [
            {
                model: Review,
                attributes: ['stars']
            },
            {
                model: SpotImage,
                attributes: ['url']
            }]
    })

    // allSpots.toJson()
    let newArray = []
    allSpots.forEach((ele) => {

        newArray.push(ele.toJSON())
    })
    newArray.forEach((ele) => {
        let starsAmount = 0
        let starsCount = 0
        ele.Reviews.forEach((review) => {

            if (review.stars) {
                starsAmount += review.stars
                starsCount += 1
            }
        })
        if (starsAmount !== 0) {
            ele.avgRating = (starsAmount / starsCount)
        }
        else {
            ele.avgRating = 'This spot has no ratings'
        }
        delete ele.Reviews
    })
    newArray.forEach((ele) => {
        ele.SpotImages.forEach((spotimg) => {
            if (spotimg.url) {
                ele.previewImage = spotimg.url
            }
            else {
                ele.previewImage = 'no image for this spot'
            }

        })
        delete ele.SpotImages
    })

    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    res.json(newArray)
})

router.delete('/:spotId', requireAuth, async (req, res, next) => {

    let testing = await Spot.destroy({
        where: {
            id: req.params.spotId,
            ownerId: req.user.id
        }
    })
    console.log(testing)
    if (testing) {

        res.status(200)
            .setHeader('Content-Type', 'application/json')
            .json({
                message: "Successfully deleted"
            })
    }
    else {
        res.status(404)
            .setHeader('Content-Type', 'application/json')
            .json({
                message: "Spot couldn't be found"
            })
    }
})
router.post('/', requireAuth, validateLogin2, displayValidationErrors, async (req, res, next) => {
    let { address, city, state, country, lat, lng, name, description, price } = req.body

    let newBag = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })
    res.status(201)
    res.setHeader('Content-Type', 'application/json')
    res.json(newBag)
})



module.exports = router;
