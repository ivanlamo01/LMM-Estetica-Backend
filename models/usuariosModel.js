const mongoose = require("../config/mongodb")
const bcrypt = require("bcrypt")
const validators = require("../utils/validators")

const usuariosSchema = mongoose.Schema({
    userName:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type:String,
        validate:{
            validator: function(value){
                return validators.isGoodPassword(value)
            },
            message: "La contraseña debe tener al menos una letra mayuscula, una minuscula, un numero y un caracter especial "
        }
    }
},{timestamps:true}
)

usuariosSchema.pre("save",function(next){
    this.password = bcrypt.hashSync(this.password,10)
    next()
})

module.exports = mongoose.model("usuarios",usuariosSchema)