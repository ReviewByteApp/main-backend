const Review = require("../models/reviewModel")
const Business = require("../models/businessModel")
const Customer = require("../models/customerModel")

exports.recentReviews=async(req,res)=>{
    try {
        // const reviews=await Review.find().sort({ createdAt: -1 }).limit(3)
        const reviews=await Review.find()
        .populate('customerId', 'pic name')
        .populate('businessId', 'name')
        .sort({ createdAt: -1 })
        .limit(8);

        const recentReviews = reviews.map((reviews) => {
            return {
                _id: reviews._id,
                customerPic: reviews.customerId.pic,
                customerName: reviews.customerId.name,
                businessName: reviews.businessId.name,
                description: reviews.description,
                rate: reviews.rate,
            };
          });
        
        res.status(200).json({recentReviews})

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

exports.latestReviews=async(req,res)=>{
    const businessId=req.query.id
    try {
        // const reviews=await Review.find().sort({ createdAt: -1 }).limit(3)
        const reviews=await Review.find({businessId:businessId})
        .populate('customerId', 'pic name')
        .populate('businessId', 'name')
        .sort({ createdAt: -1 })
        .limit(4);

        const latestReviews = reviews.map((reviews) => {
            return {
                _id: reviews._id,
                customerPic: reviews.customerId.pic,
                customerName: reviews.customerId.name,
                description: reviews.description,
                rate: reviews.rate,
            };
          });
        
        res.status(200).json({latestReviews})

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}