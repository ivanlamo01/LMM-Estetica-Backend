const usuariosModel = require("../models/usuariosModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports={
    create:async function(req, res, next) {
        try{
          console.log(req.body)
          console.log(req.body.name)
          const document = new usuariosModel({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
          })
          const response = await document.save()

          res.json(response)
        }catch(e){
          //e.status=200
          next(e)
        }
        
    },
    login:async function(req, res, next) {
      try{
        const user = await usuariosModel.findOne({email:req.body.email})
        if(!user){
          res.status(401).json({message:"Usuario y/o contraseña incorrectos"})
        }
        if(bcrypt.compareSync(req.body.password,user.password)){
          const token = jwt.sign({userId:user._id},req.app.get("secretKey"),{expiresIn:"1h"})
          res.status(201).json({token})
        }else{
          res.status(401).json({message:"Usuario y/o contraseña incorrectos"})
        }
      }catch(e){
        //e.status=200
        next(e)
      }
      
  },
    
}