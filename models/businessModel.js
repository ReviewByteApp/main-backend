const mongoose=require('mongoose')

const BusinessSchema=mongoose.Schema({
    name:{type:String,required:true},
    city:{type:String,required:true},
    country:{type:String,required:true},
    map:{type:String},
    images:[{ type: String }],
    video:{type:String},
    services:[{ type: String }],
    description:{type:String},
    logo:{type:String},
    category:{type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true},
    subCategory:{type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true},
    reviewCount:{type:Number,default:0},
    reviewScore:{type:Number,default:0},
    reviewSum:{type:Number,default:0},
    website:{type:String},
    phone:[{ type: String }],
    email:{type:String,required:true,unique: true},
    password:{type:String,required:true},
    token:{type:String},
    createAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null },
})


const Business=mongoose.model('Business',BusinessSchema)
module.exports=Business