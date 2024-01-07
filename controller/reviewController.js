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

exports.businessReviews=async(req,res)=>{
    const businessId=req.query.id;
    const {pageNum,rate}=req.body
    const limit=10

    const page=pageNum||1
    const rateValue=rate ||4

    const rateMax=rateValue + 1

    function formatDate(dateString) {
        const dateObj = new Date(dateString);
      
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const formattedDate = dateObj.toLocaleDateString('en-US', options);
      
        return formattedDate;
      }

    function postDate(date){
        let currentDate=new Date()
        let givenDate=new Date(date)

        let dayValue= Math.floor((currentDate - givenDate) / (24 * 60 * 60 * 1000));

        if(dayValue < 7){
            return `${dayValue} day ago`
        }
        else if(dayValue > 7 && dayValue <30 ){
            return `${Math.floor(dayValue/7)} week ago`
        }
        else if(dayValue >30 && dayValue <365 ){
            return `${Math.floor(dayValue/30)} month ago`
        }
        else if(dayValue >365){
            return `${Math.floor(dayValue/365)} year ago`
        }

    }

    try {

        let query = {
            businessId:businessId,
            rate:{$gte:rateValue,$lt:rateMax}
          };

        const count=await Review.countDocuments(query)
        const totalPages = Math.ceil(count / limit);

        const businessReview=await Review.find(query)
        .populate('customerId', 'pic name city country reviewCount createAt')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);


        const reviews=businessReview.map((reviews) => {
            return {
                _id: reviews._id,
                customerPic: reviews.customerId.pic,
                customerName: reviews.customerId.name,
                customerReview: reviews.customerId.reviewCount,
                customerLocation: `${reviews.customerId.city},${reviews.customerId.country}`,
                title: reviews.title,
                description: reviews.description,
                date: formatDate(reviews.date),
                rate: reviews.rate,
                like: reviews.like,
                postDate:postDate(reviews.date)
            };
          });


        res.status(200).json({count:count,totalPages:totalPages,reviews})
  
    } catch (error) {
      res.status(500).json({error:error.message})
    }
  }

  exports.analysis=async(req,res)=>{
    const id=req.query.id

    try {

        let oneStarQuery={
            rate:{$gte:1 ,$lt:2},
            businessId:id
        }
        
        let twoStarQuery={
            rate:{$gte:2 ,$lt:3},
            businessId:id
        }
        
        let threeStarQuery={
            rate:{$gte:3 ,$lt:4},
            businessId:id
        }
        
        let fourStarQuery={
            rate:{$gte:4 ,$lt:5},
            businessId:id
        }
        let fiveStarQuery={
            rate:{$gte:5},
            businessId:id
        }

        let query={
            businessId:id
        }

        const count=await Review.countDocuments(query)

        const oneStar=Math.round((await Review.countDocuments(oneStarQuery)/ count )*100)
        const twoStar=Math.round((await Review.countDocuments(twoStarQuery)/ count )*100)
        const threeStar=Math.round((await Review.countDocuments(threeStarQuery)/ count )*100)
        const fourStar=Math.round((await Review.countDocuments(fourStarQuery)/ count )*100)
        const fiveStar=Math.round((await Review.countDocuments(fiveStarQuery)/ count )*100)

        res.status(200).json({count,oneStar,twoStar,threeStar,fourStar,fiveStar})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
  }

  exports.newReview=async(req,res)=>{
    const {customerId,businessId,title,description,rate,date}=req.body

    try {
        const addReview=new Review({
            customerId:customerId,
            businessId:businessId,
            title:title,
            description:description,
            rate:rate,
            date:date,
        })
        await addReview.save()
        
        const CustomerReviewcount=await Customer.findById(customerId)
        const busnessReviewcount=await Business.findById(businessId)

        await Customer.findByIdAndUpdate(
            customerId,
            {
            reviewCount: CustomerReviewcount.reviewCount+1,
            updatedAt: Date.now(), 
            },
          );
        
        await Business.findByIdAndUpdate(
            businessId,
            {
            reviewCount: busnessReviewcount.reviewCount+1,
            reviewSum:busnessReviewcount.reviewSum+rate,
            reviewScore:((busnessReviewcount.reviewSum+rate)/(busnessReviewcount.reviewCount+1)).toFixed(1),
            updatedAt: Date.now(),  
            }
        )

        res.status(200).json({msg:"Review posted Successfuly "})

    } catch (error) {
        res.status(500).json({error:error.message})
    }
  }