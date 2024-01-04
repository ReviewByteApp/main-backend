const express=require('express')
const router=express.Router()

const category=require('../controller/categoryController')

/**
 * @api {get} /category/explore Explore Categories
 * @apiName Explore
 * @apiGroup Category
 *
 * @apiDescription Get all categories and their subcategories.
 *
 * @apiSuccess {Object[]} category List of categories.
 * @apiSuccess {String} category.catId Category ID.
 * @apiSuccess {String} category.name Category name.
 * @apiSuccess {String} category.icon Category icon.
 * @apiSuccess {Object[]} category.subcategory List of subcategories.
 * @apiSuccess {String} category.subcategory.name Subcategory name.
 * @apiSuccess {String} category.subcategory.subId Subcategory ID.
 *
 * @apiError (500 Internal Server Error) error Error message.
 */
router.get('/explore',category.explore)

module.exports=router