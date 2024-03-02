const express = require("express");
const router=express.Router()

const subCategory=require('./subCategoryRoute')
const Category=require('./categoryRoute')
const Business=require('./businessRoute')
const Search=require('./searchRoute')
const Review=require('./reviewRoute')
const Customer=require('./customerRoute')

router.use('/review',Review)
router.use('/category',Category)
router.use('/subcategory',subCategory)
router.use('/business',Business)
router.use('/customer',Customer)
router.use('/search',Search)

module.exports=router
