const express=require('express')
const searchController=require('../controller/searchController')
const router=express.Router()


/**
 * @api {get} /search/preview/:search Search Preview
 * @apiName Search Preview
 * @apiGroup Search
 *
 * @apiDescription Search for companey or category using name and get max 5 companey and 3 category
 *
 * @apiParam {String} search name of the business or category.
 * 
 * @apiSuccess {Object[]} businessData list of business.
 * @apiSuccess {String} businessData._id id of business.
 * @apiSuccess {String} businessData.name name of business.
 * @apiSuccess {String} businessData.city city of business.
 * @apiSuccess {String} businessData.country country of business.
 * @apiSuccess {Number} businessData.reviewScore review Score of business.
 * @apiSuccess {Number} businessData.reviewCount review count of business.
 * 
 * @apiSuccess {Object[]} subCategories List of subCategory.
 * @apiSuccess {String} subCategories._id id of subCategory.
 * @apiSuccess {String} subCategories.categoryId category of subCategory.
 * @apiSuccess {String} subCategories.name Name of subCategory.
 * @apiSuccess {String} subCategories.icon icon of subCategory.
 *
 * @apiError (500 Internal Server Error) error Error message.
 */

router.get('/preview',searchController.searchPreview)


/**
 * @api {get} /search/business/:search Search Business
 * @apiName Search Business
 * @apiGroup Search
 *
 * @apiDescription Search for Business using name ,rate ,location and get 10 data per page
 *
 * @apiParam {String} search name of the Business.
 * 
 * @apiBody {Number} [pageNum] page number.
 * @apiBody {Number} [rate] rate score.
 * @apiBody {String} [location] location of the business.
 * @apiBody {String} subCategoryId id of subCategory of the business.
 * 
 * @apiSuccess {Object[]} businessData list of business.
 * @apiSuccess {String} businessData._id id of business.
 * @apiSuccess {String} businessData.name name of business.
 * @apiSuccess {String} businessData.city city of business.
 * @apiSuccess {String} businessData.country country of business.
 * @apiSuccess {Number} businessData.reviewScore review Score of business.
 * @apiSuccess {Number} businessData.reviewCount review count of business.
 * 
 * @apiError (500 Internal Server Error) error Error message.
 */

router.get('/business',searchController.searchBusiness)

/**
 * @api {get} /search/subcategory/:search Search subcategory
 * @apiName Search subcategory
 * @apiGroup Search
 *
 * @apiDescription Search for category using name and get max 6 category
 *
 * @apiParam {String} search name of the category.
 * 
 * @apiSuccess {Object[]} subCategories List of subCategory.
 * @apiSuccess {String} subCategories._id id of subCategory.
 * @apiSuccess {String} subCategories.categoryId category of subCategory.
 * @apiSuccess {String} subCategories.name Name of subCategory.
 * @apiSuccess {String} subCategories.icon icon of subCategory.
 *
 * @apiError (500 Internal Server Error) error Error message.
 */

router.get('/subcategory',searchController.searchSubCat)

module.exports=router