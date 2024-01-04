const mongoose=require('mongoose')

const customerSchema=mongoose.Schema({
    pic:{type:String},
    name:{type:String,required:true},
    city:{type:String,required:true},
    country:{type:String,required:true},
    reviewCount:{type:Number,default:0},
    email: { type:String,required:true},
    password: { type: String },
    createAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null },
})


const Customer=mongoose.model('Customer',customerSchema)
module.exports=Customer