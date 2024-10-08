const categoriesModel = require("../models/categoriesModel")

module.exports={

    getAll:async function(req, res, next) {
      try{
        const categories = await categoriesModel.find()
        res.json(categories)
      }catch(e){
        next(e)
      }
    },

    create:async function(req, res, next) {
        try{
          const document = new categoriesModel({
            name:req.body.name
          })
          const response = await document.save()
          res.json(response)
          
        }catch(e){
          //e.status=200
          next(e)
        }
        
    },
    
}