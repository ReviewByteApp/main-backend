const express =require('express')
const businessController=require('../controller/businessController')
const router=express.Router()

/**
 * @api {post} /business/filterByCategory Filter Categories
 * @apiName Filter Categories
 * @apiGroup Business
 *
 * @apiDescription Filter Business Categories by rate ,location,subCategories
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
 * @api {post} /business/filterBySubCategory Filter SubCategories
 * @apiName Filter SubCategories
 * @apiGroup Business
 *
 * @apiDescription Filter Business sub Categories by rate ,location
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
