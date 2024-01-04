const express=require('express')
const router=express.Router()
const subCatController=require('../controller/subCategoryController')


/**
 * @api {get} /subcategory/discover Discover SubCategories
 * @apiName Discover
 * @apiGroup SubCategory
 *
 * @apiDescription Get 2 subcategories from all category.
 *
 * @apiSuccess {Object[]} subcategories List of subcategories.
 * @apiSuccess {String} subcategories._id subcategory ID.
 * @apiSuccess {String} subcategories.categoryId category ID.
 * @apiSuccess {String} subcategories.name subcategory name.
 * @apiSuccess {String} subcategories.icon subcategory icon.
 *
 * @apiError (500 Internal Server Error) error Error message.
 */
router.get('/discover',subCatController.discover)

module.exports=router

