const express=require('express')
const router=express.Router()
const reviewController=require('../controller/reviewController')
const Auth=require('../middleware/Auth')


/**
 * @api {get} /review/recent recent reviews
 * @apiName recent reviews
 * @apiGroup Review
 *
 * @apiDescription Get 8 recent reviews.
 *
 * @apiSuccess {Object[]} reviews List of reviews.
 * @apiSuccess {String} reviews._id id of the review.
 * @apiSuccess {String} reviews.customerPic profile pic of the customer.
 * @apiSuccess {String} reviews.customerName name of the customer.
 * @apiSuccess {String} reviews.businessName name of the Business.
 * @apiSuccess {String} reviews.rate rate score of the review.
 * @apiSuccess {String} reviews.description description of the review.
 *
 * @apiError (500 Internal Server Error) error Error message.
 */
router.get('/recent',reviewController.recentReviews)

/**
 * @api {get} /review/latest/:id latest reviews
 * @apiName latest reviews
 * @apiGroup Review
 *
 * @apiDescription Get 4 latest reviews for the business.
 *
 *  @apiParam {ObjectId} id id of the business.
 *
 * @apiSuccess {Object[]} reviews List of reviews.
 * @apiSuccess {String} reviews._id id of the review.
 * @apiSuccess {String} reviews.customerPic profile pic of the customer.
 * @apiSuccess {String} reviews.customerName name of the customer.
 * @apiSuccess {String} reviews.rate rate score of the review.
 * @apiSuccess {String} reviews.description description of the review.
 *
 * @apiError (500 Internal Server Error) error Error message.
 */

router.get('/latest',reviewController.latestReviews)


/**
 * @api {get} /review/business/:id business reviews
 * @apiName business reviews
 * @apiGroup Review
 *
 * @apiDescription Get reviews for the business.
 *
 * @apiParam {ObjectId} id id of the business.
 *
 * @apiSuccess {Object[]} reviews List of reviews.
 * @apiSuccess {String} reviews._id id of the review.
 * @apiSuccess {String} reviews.customerPic profile pic of the customer.
 * @apiSuccess {String} reviews.customerName name of the customer.
 * @apiSuccess {String} reviews.customerReview number of review the customer gave.
 * @apiSuccess {String} reviews.customerLocation location of the customer.
 * @apiSuccess {String} reviews.title title of the review.
 * @apiSuccess {String} reviews.description description of the review.
 * @apiSuccess {String} reviews.rate rate of the review.
 * @apiSuccess {String} reviews.date date of exprieance.
 * @apiSuccess {String} reviews.like number of like for review.
 * @apiSuccess {String} reviews.postDate the date the review posted.
 *
 * @apiError (500 Internal Server Error) error Error message.
 */

router.get('/business',reviewController.businessReviews)


/**
 * @api {get} /review/analysis/:id reviews analysis
 * @apiName reviews analysis
 * @apiGroup Review
 *
 * @apiDescription Get reviews analysis for the business.
 *
 * @apiParam {ObjectId} id id of the business.
 *
 * @apiSuccess {String} count total review.
 * @apiSuccess {String} oneStar percent for one star review.
 * @apiSuccess {String} twoStar percent for two star review.
 * @apiSuccess {String} threeStar percent for three star review.
 * @apiSuccess {String} fourStar percent for four star review.
 * @apiSuccess {String} fiveStar percent for five star review.
 *
 * @apiError (500 Internal Server Error) error Error message.
 */
router.get('/analysis',reviewController.analysis)


/**
 * @api {post} /review/new Give Review
 * @apiName Give Review
 * @apiGroup Review
 *
 * @apiDescription Give Review for business
 *
 * @apiBody {String} customerId customer id.
 * @apiBody {String} businessId business id.
 * @apiBody {String} title title of the review.
 * @apiBody {String} description description of the review.
 * @apiBody {Number} rate review rate.
 * @apiBody {Date} date exprance date.
 * 
 * @apiSuccess (review sent successfuly).
 *
 * @apiError (500 Internal Server Error) error Error message.
 */
router.post('/new',Auth.authenticateToken,reviewController.newReview)

module.exports=router

