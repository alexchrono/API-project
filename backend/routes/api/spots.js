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


const authError= function (err, req, res, next) {
    res.status(401);
    res.setHeader('Content-Type','application/json')
    res.json(
        {
            message: "Authentication required"
          }
    );
  };
let validateLoginBooking=[(req,res,next)=>{
    let startDate= new Date(req.body.startDate)
    let endDate = new Date(req.body.endDate)
        if(startDate>endDate){
           res.status(400)
          .setHeader('Content-Type','application/json')
          .json(
          {
            message: "Bad Request",
            errors: {
              endDate: "endDate cannot be on or before startDate"
            }
          })
        }
        else {
            next()
        }
    }


];
const makeError = (status, message, res,data = {}) => {
    return res.status(status).json({ message, ...data });
  };
const validateLoginLastOne = [
    check('page')
    .optional()
        .exists({ checkFalsy: true })
        .notEmpty()
        .custom((value)=>{
            if (parseInt(value)<1){
                return false
            }
            else {
                return true
            }
        })
        .withMessage("Page must be greater than or equal to 1"),
        check('size')
        .optional()
        .exists({ checkFalsy: true })
        .notEmpty()
        .custom((value)=>{
            if (parseInt(value)<1){
                return false
            }
            else {
                return true
            }
        })
        .withMessage("Size must be greater than or equal to 1")
        ,
        check('minLat')
        .optional()
        .isFloat({min:-90, max:90})
        .withMessage('Minimum latitude is invalid'),
        check('maxLat')
        .optional()
        .isFloat({min:-90, max:90})
        .withMessage("Maximum latitude is invalid"),
        check('minLng')
        .optional()
        .isFloat({min:-180, max:180})
        .withMessage('Minimum longitude is invalid'),
        check('maxLng')
        .optional()
        .isFloat({min:-180, max:180})
        .withMessage('Maximum longitude is invalid'),
        check('minPrice')
        .optional()
        .isFloat({min:0})
        .withMessage('Minimum price must be greater than or equal to 0'),
        check('maxPrice')
        .optional()
        .isFloat({min:0})
        .withMessage('Maximum price must be greater than or equal to 0'),
    handleValidationErrors
];


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
router.post('/:spotId/reviews', requireAuth,authError, validateLogin3, displayValidationErrors, async (req, res) => {
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
router.get('/:spotId/bookings',requireAuth,authError,async (req,res)=>{
    let realTest=await Spot.findByPk(req.params.spotId)
    if(!realTest){
        res.status(404)
        .setHeader('Content-Type','application/json')
        .json({
            message: "Spot couldn't be found"
        })
    }
    if(realTest.ownerId!==req.user.id){
        let result= await Booking.findAll({
            where: {
                spotId:req.params.spotId
            },
            attributes: ['spotId','startDate','endDate']
        })

        res.status(200)
        .setHeader('Content-Type','application/json')
        .json({Bookings:result})
    }

    else if(realTest.ownerId===req.user.id){
    let test= await Booking.findAll({
        where: {
            spotId:req.params.spotId,
        },
        include: {model:User,
        attributes: ['id','firstName','lastName']}

    })
    let newArray=[]
    test.forEach((ele) => {

        newArray.push(ele.toJSON())
    })
    let returnArray=[]
    newArray.forEach((booking)=>{
        let returnObj={}
        returnObj.User=booking.User
        returnObj.id=booking.id
        returnObj.spotId=booking.spotId
        returnObj.userId=booking.userId
        returnObj.startDate=booking.startDate
        returnObj.endDate=booking.endDate
        returnObj.createdAt=booking.createdAt
        returnObj.updatedAt=booking.updatedAt
        returnArray.push(returnObj)
    })
    res.status(200)
    .setHeader('Content-Type','application/json')
    .json({Bookings: returnArray})
    }


})

router.post('/:spotId/images', requireAuth, authError, async (req, res) => {
    const { url, preview } = req.body;
    const spotId = req.params.spotId;
    const spot = await Spot.findOne({ where: { id: spotId } });

     if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    } else if (spot && spot.ownerId !== req.user.id) {
        next(err)
    }
    else if (spot && spot.ownerId === req.user.id) {
        const spotImage = await SpotImage.create({ spotId, url, preview });

        const { updatedAt, createdAt, ...response } = spotImage.toJSON();
        delete response.spotId;
        return res.json(response);
    }

}, catchAuthoError);



// router.post("/:spotId/images", requireAuth, authError,async (req, res) => {
//     const { url, preview } = req.body;
//     const spotId = req.params.spotId;

//     const spot = await Spot.findOne({ where: { id: spotId} });

//      if (spot && spot.ownerId === req.user.id) {
//       const spotImage = await SpotImage.create({ spotId, url, preview });
//       const { updatedAt, createdAt, ...response } = spotImage.toJSON();
//       delete response.spotId;
//       return res.json(response);

//     }
//    else if (!spot) {

//         return res.status(404).json({message: `Spot couldn't be found`})}

//      else if (spot && spot.ownerId !== req.user.id) {
//     //   return makeError(403, "Forbidden", {}, res);
//     next(err)
//     }
//   },catchAuthoError);
router.post('/:spotId/bookings',requireAuth,authError,validateLoginBooking,displayValidationErrors,async (req,res)=>{
let test= await Spot.findByPk(req.params.spotId)
if(!test){
   return res.status(404)
    .setHeader('Content-Type','application/json')
    .json({
        message: "Spot couldn't be found"
      })
}

let {startDate,endDate}=req.body

startDate=new Date(startDate)
endDate=new Date(endDate)
if(test && test.ownerId===req.user.id){
    return next(err)
}
 if(test && test.ownerId!==req.user.id){
    let datesToCheckStart= await Booking.findAll({
        where: {
            spotId:req.params.spotId,

            startDate: {
                [Op.between]: [startDate,endDate]
            }}})
    let datesToCheckEnd= await Booking.findAll({
        where: {
            spotId:req.params.spotId,

            endDate: {
                [Op.between]: [startDate,endDate]
            }}})


    if (datesToCheckStart.length===0 && datesToCheckEnd.length===0){
        let goal=await Booking.create({
            spotId:req.params.spotId,
            userId:req.user.id,
            startDate,
            endDate
        })
        res.status(200)
.setHeader('Content-Type','application/json')
.json(goal)
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







},catchAuthoError)
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
router.get('/current', requireAuth,authError, async (req, res) => {

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



router.put('/:spotId', requireAuth,authError, validateLogin2, displayValidationErrors, async (req, res) => {
    let { address, city, state, country, lat, lng, name, description, price } = req.body
    let targetSpot = await Spot.findOne({
        where: {

            id: req.params.spotId
        }
    })
    if (targetSpot && targetSpot.ownerId===req.user.id) {
        await targetSpot.update({address,city,state,country,lat,lng,name,description,price})
        // targetSpot.address = address,
        //     targetSpot.city = city,
        //     targetSpot.state = state,
        //     targetSpot.country = country,
        //     targetSpot.lat = lat,
        //     targetSpot.lng = lng,
        //     targetSpot.name = name,
        //     targetSpot.description = description,
        //     targetSpot.price = price,
        //     targetSpot.createdAt = targetSpot.createdAt
        // targetSpot.updatedAt = Date.now();
        // await targetSpot.save()
        res.status(200)
        res.json(targetSpot)
    }

    else if(!targetSpot){
        res.status(404)
            .setHeader('Content-Type', 'application/json')
            .json({
                message: "Spot couldn't be found"
            })
    }
    else if (targetSpot && targetSpot.ownerId!==req.user.id){
        next(err)
    }
},catchAuthoError)

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


router.delete('/:spotId', requireAuth,authError, async (req, res, next) => {
    let check= await Spot.findByPk(req.params.spotId)
    let testing = await Spot.destroy({
        where: {
            id: req.params.spotId,
            ownerId: req.user.id
        }
    })

    if(!check){
        res.status(404)
            .setHeader('Content-Type', 'application/json')
            .json({
                message: "Spot couldn't be found"})}
   else if (testing) {

        res.status(200)
            .setHeader('Content-Type', 'application/json')
            .json({
                message: "Successfully deleted"
            })
    }

    else if(check&& check.ownerId!==req.user.id){
        next(err)
    }
},catchAuthoError)
router.post('/', requireAuth,authError, validateLogin2, displayValidationErrors, async (req, res, next) => {
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
router.get('/', validateLoginLastOne,displayValidationErrors,async (req, res) => {
    let {page,size,maxLat,minLat,minLng,maxLng,minPrice,maxPrice}=req.query;
    if(!page){
        page=1
    }
    if(!size){
        size=20
    }
    page=parseInt(page)
    size=parseInt(size)
    let pagination= {limit: size,
    offset: (page-1)}
    let where= {

    }
    if(maxLat && minLat){
        maxLat=parseFloat(maxLat)
        minLat=parseFloat(minLat)
        where.lat = {[Op.between]: [minLat, maxLat]};
    }
    else if(maxLat) {
        maxLat=parseFloat(maxLat)
        where.lat={[Op.lte]: maxLat}
    }
    else if(minLat) {
        minLat=parseFloat(minLat)
        where.lat={[Op.gte]:minLat}
    }
    if (minLng && maxLng){
        minLng=parseFloat(minLng)
        maxLng=parseFloat(maxLng)
        where.lng = {[Op.between]: [minLng, maxLng]};
    }
   else if (minLng) {
    minLng=parseFloat(minLng)
    where.lng={[Op.gte]:minLng}
}
   else if(maxLng) {
    maxLng=parseFloat(maxLng)
    where.lng={[Op.lte]:maxLng}
}
if(minPrice && maxPrice){
    minPrice=parseFloat(minPrice)
    maxPrice=parseFloat(maxPrice)
    where.price = {[Op.between]: [minPrice, maxPrice]};
}
    else if(minPrice){
        minPrice=parseFloat(minPrice)
        where.price={[Op.gte]:minPrice}
    }
   else if(maxPrice) {
    maxPrice=parseFloat(maxPrice)
    where.price={[Op.lte]:maxPrice}
}

    let allSpots = await Spot.findAll({
        ...pagination,
        where,
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
    res.json({Spots:newArray,page:page,size:size})
})



module.exports = router;
