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

        res.status(200).json({count:count,totalPages:totalPages,businessData});

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

        res.status(200).json({count:count,totalPages:totalPages,businessData});

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

exports.businessDetail=async(req,res)=>{
  // const businessId=req.query.id
  const businessId='65952724d87640e8d14e0865'

  try {
    const business=await Business.find()

    const detail=business.map((data) => {
      return {
          _id: data._id,
          logo: data.logo,
          name: data.name,
          reviews: data.reviewCount,
          rate: data.reviewScore,
          city: data.city,
          country: data.country,
          description: data.description,
          images: data.images,
          video: data.video,
          map: data.map,
          services: data.services,
          email: data.email,
          website: data.website,
          phone: data.phone,
      };
    });

    res.status(200).json({detail})
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}