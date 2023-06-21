const mongoose = require("../config/mongodb")
const bcrypt = require("bcrypt")

const usuariosSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String
})

usuariosSchema.pre("save",function(next){
    this.password = bcrypt.hashSync(this.password,10)
    next()
})

module.exports = mongoose.model("usuarios",usuariosSchema)