const mongoose=require('mongoose')

const ReviewSchema=mongoose.Schema({
    customerId:{type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    businessId:{type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
    title:{type:String,required:true},
    description:{type:String,required:true},
    rate:{type:Number,required:true},
    date:{type:Date,default: Date.now},
    like:{type:Number},
    createAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null },
})


const Review=mongoose.model('Review',ReviewSchema)
module.exports=Review