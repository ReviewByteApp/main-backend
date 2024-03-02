const Business=require('../models/businessModel');

exports.filterCategory=async(req,res)=>{
    const {categoryId,rate,location,subCategoryId,pageNum}=req.body;

    const rateValue = rate || 0;
    const locationValue = new RegExp(location, "i");
    const page=pageNum || 1
    const limit =10

    try {

        let query = {
            // city: locationValue,
            // reviewScore: { $gte: rateValue },
            category: categoryId,
          };
          
          // if (subCategoryId) {
          //   query.subCategory = subCategoryId;
          // }

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
            // city: locationValue,
            // reviewScore: { $gte: rateValue },
            subCategory: subCategoryId
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

        res.status(200).json({count:count,totalPages:totalPages,businessData});

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

exports.businessDetail=async(req,res)=>{
  const businessId=req.query.id
  // const businessId='65952724d87640e8d14e0865'

  try {
    const business=await Business.findById(businessId)

    const detail={
          _id: business._id,
          logo: business.logo,
          name: business.name,
          reviews: business.reviewCount,
          rate: business.reviewScore,
          city: business.city,
          country: business.country,
          description: business.description,
          images: business.images,
          video: business.video,
          map: business.map,
          services: business.services,
          email: business.email,
          website: business.website,
          phone: business.phone,
      };

    res.status(200).json({detail})
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}

