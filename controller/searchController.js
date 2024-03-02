const Business = require("../models/businessModel");
const SubCategory = require("../models/subCategoryModel");


exports.searchPreview=async(req,res)=>{
    const searchInput=req.query.search;

    const searchValue =new RegExp(searchInput, "i");

    try {
        const business=await Business.find({name:searchValue}).limit(5)
        const subCategories=await SubCategory.find({name:searchValue}).limit(3)

        const businessData = business.map((category) => {
            return {
                _id: category._id,
                name: category.name,
                city: category.city,
                country: category.country,
                reviewCount: category.reviewCount,
                reviewScore: category.reviewScore,
            };
          });

        res.status(200).json({businessData,subCategories})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}


exports.searchBusiness=async(req,res)=>{

    const {rate,location,pageNum}=req.body;
    const searchInput=req.query.search;
    const rateValue = rate ||0;
    const locationValue = new RegExp(location, "i");
    const page=pageNum || 1
    const limit =10

    const searchValue = new RegExp(searchInput, "i");

    try {

        let query = {
            name:searchValue,
            // city: locationValue,
            // reviewScore: { $gte: rateValue }
          };
          
        const count=await Business.countDocuments(query)
        const totalPages = Math.ceil(count / limit);

        const business=await Business.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

        const businessData=business.map((data) => {
            return {
                _id: data._id,
                name: data.name,
                city: data.city,
                country: data.country,
                logo: data.logo,
                reviews: data.reviewCount,
                rate: data.reviewScore,
                services: data.services,
                map: data.map,
                website: data.website,
                email: data.email,
            };
          });

        res.status(200).json({count:count,totalPages:totalPages,businessData})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

exports.searchSubCat=async(req,res)=>{
    const searchInput=req.query.search;

    const searchValue = new RegExp(searchInput, "i");

    try {
        const subCategories=await SubCategory.find({name:searchValue}).limit(6)

        res.status(200).json({subCategories})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}