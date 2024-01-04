const mongoose=require('mongoose')

const SubCategorySchema=mongoose.Schema({
    name:{type:String,required:true},
    icon:{type:String,required:true},
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
})


const SubCategory=mongoose.model('SubCategory',SubCategorySchema)
module.exports=SubCategory