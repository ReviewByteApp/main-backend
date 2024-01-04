const Business=require('../models/businessModel');

exports.filterCategory=async(req,res)=>{
    const {categoryId,rate,location,subCategoryId,pageNum}=req.body;

    const rateValue = rate || 0;
    const locationValue = new RegExp(location, "i");
    const page=pageNum || 1
    const limit =10

    try {

        let query = {
            city: locationValue,
            reviewScore: { $gte: rateValue }
          };
          
          if (subCategoryId) {
            query.subCategory = subCategoryId;
          }
          if (!categoryId) {
            query.category = "65946b7c77a11ab59811ec1f";
          }

        const count=await Business.countDocuments(query)

        const totalPages = Math.ceil(count / limit);

        const business=await Business.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

        res.status(200).json({count:count,totalPages:totalPages,business});

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}


exports.filterSubCategory=async(req,res)=>{
    const {subCategoryId,rate,location,pageNum}=req.body;

    const rateValue = rate || 0;
    const locationValue = new RegExp(location, "i");
    const page=pageNum || 1
    const limit =10

    try {

        let query = {
            city: locationValue,
            reviewScore: { $gte: rateValue }
          };
          
          if (!subCategoryId) {
            query.subCategory = "65946dc177a11ab59811ec40";
          }
          

        const count=await Business.countDocuments(query)

        const totalPages = Math.ceil(count / limit);

        const business=await Business.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

        res.status(200).json({count:count,totalPages:totalPages,business});

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}