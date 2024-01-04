const express =require('express')
const businessController=require('../controller/businessController')
const router=express.Router()

/**
 * @api {post} /business/filterByCategory Filter Business by Categories
 * @apiName Filter Business by Categories
 * @apiGroup Business
 *
 * @apiDescription Filter Business by Categories also using rate ,location,subCategories
 *
 * @apiBody {Number} [pageNum] page number.
 * @apiBody {Number} [rate] rate score.
 * @apiBody {String} [location] location of the business.
 * @apiBody {String} CategoryId  id of Category of the business.
 * @apiBody {String} [subCategoryId] id of subCategory of the business.
 * 
 * @apiSuccess {Number} count total business.
 * @apiSuccess {Number} totalpage total page numbers 10 data per page.
 * @apiSuccess {Object[]} business List of business.
 * @apiSuccess {String} business.name Name of business.
 *
 * @apiError (500 Internal Server Error) error Error message.
 */
router.get('/filterByCategory',businessController.filterCategory)

/**
 * @api {get} /business/detail Business Detail
 * @apiName Business Detail
 * @apiGroup Business
 *
 * @apiDescription Get Business Detail by id
 *
 * @apiParam {String} id id of the business.
 * 
 * @apiSuccess {Object[]} business business detail.
 * @apiSuccess {String} business.logo logo of business.
 * @apiSuccess {String} business.name Name of business.
 * @apiSuccess {Number} business.reviewScore reviews score of business.
 * @apiSuccess {Number} business.reviewCount reviews count of business.
 * @apiSuccess {String} business.city city of business.
 * @apiSuccess {String} business.country country of business.
 * @apiSuccess {String} business.description description of business.
 * @apiSuccess {Array} business.images images of business.
 * @apiSuccess {String} business.video video of business.
 * @apiSuccess {String} business.map map of business.
 * @apiSuccess {Array} business.services Services of business.
 * @apiSuccess {String} business.email email of business.
 * @apiSuccess {String} business.website website of business.
 * @apiSuccess {Array} business.phone phone of business.
 *
 * @apiError (500 Internal Server Error) error Error message.
 */

router.get('/detail',businessController.businessDetail)


/**
 * @api {post} /business/filterBySubCategory Filter Business by SubCategories
 * @apiName Filter Business by SubCategories
 * @apiGroup Business
 *
 * @apiDescription Filter Business by sub Categories also using rate ,location
 *
 * @apiBody {Number} [pageNum] page number.
 * @apiBody {Number} [rate] rate score.
 * @apiBody {String} [location] location of the business.
 * @apiBody {String} subCategoryId id of subCategory of the business.
 * 
 * @apiSuccess {Number} count total business.
 * @apiSuccess {Number} totalpage total page numbers 10 data per page.
 * @apiSuccess {Object[]} business List of business.
 * @apiSuccess {String} business.name Name of business.
 *
 * @apiError (500 Internal Server Error) error Error message.
 */
router.get('/filterBySubCategory',businessController.filterSubCategory)

module.exports=router
