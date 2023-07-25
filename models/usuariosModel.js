const mongoose = require("../config/mongodb")
const bcrypt = require("bcrypt")
const validators = require("../utils/validators")

const usuariosSchema = mongoose.Schema({
    name:String,
    email:String,
    password:{
        type:String,
        validate:{
            validator: function(value){
                return validators.isGoodPassword(value)
            },
            message: "Incorrecto"
        }
    }
})

usuariosSchema.pre("save",function(next){
    this.password = bcrypt.hashSync(this.password,10)
    next()
})

module.exports = mongoose.model("usuarios",usuariosSchema)