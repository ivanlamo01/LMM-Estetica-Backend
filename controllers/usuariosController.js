const usuariosModel = require("../models/usuariosModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports={
    create:async function(req, res, next) {
        try{
          const userFound = await usuariosModel.findOne({email:req.body.email})
            if(userFound)
              return res.status(400).json(["El email ya se encuentra registrado"])
          
          const userNameFound = await usuariosModel.findOne({userName:req.body.userName})
            if(userNameFound)
              return res.status(400).json(["El nombre de usuario ya se encuentra registrado"])

            const newUser = new usuariosModel({
            userName:req.body.userName,
            email:req.body.email,
            password:req.body.password,
          })

          const userSaved = await newUser.save()
          res.send("Registrado")
          res.json(userSaved)
        }catch(e){
          console.log("🚀 ~ file: usuariosController.js:18 ~ create:function ~ e:", e)
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
          res.status(401).json({message:" contraseña incorrecta"})
        }
      }catch(e){
        //e.status=200
        next(e)
      }
      
  },
    
}