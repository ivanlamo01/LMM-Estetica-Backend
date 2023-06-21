const mongoose = require("../config/mongodb")

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"El campo name es obligatorio"]
    },
    price:{
        type: Number,
        required:[true,"El campo name es obligatorio"],
        min: [0,"El precio debe ser mayor a 0"],
        /*get: function(value){
            return value*1.21
        },
        // set: function(value){
        //     return value*1.21
        // }*/

    },
    description:String,
    quantity:Number,
    status:String,
    category:{
        type: mongoose.Schema.ObjectId,
        ref:"categories"
    }
})

productSchema.virtual("price_currency").get(function(){
    return `$ ${this.price}`
})

productSchema.set("toJSON",{getters:true,virtuals:true})
module.exports = mongoose.model("productos",productSchema)