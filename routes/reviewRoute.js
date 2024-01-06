const express=require('express')
const router=express.Router()
const reviewController=require('../controller/reviewController')


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

module.exports=router

