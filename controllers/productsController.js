const productsModel = require("../models/productosModel")

module.exports = {

    getAll: async function(req, res, next) {
        try{
            //datos enviados por query string '?'
            console.log(req.query)
            const documents = await productsModel.find().select("name price category").sort({price:-1}).populate("category")
            res.status(200).json(documents);
        }catch(e){
            console.log(e)
            res.status(400).json(e)
        }
    },

    getById: async function(req, res, next) {
        try{
            console.log(req.params.id)
            const document = await productsModel.findById(req.params.id)
            // const document = await productsModel.findOne({_id:req.params.id})
            res.status(200).json(document);
        }catch(e){
            console.log(e)
            res.status(400).json(e)
        }
    },

    getCategoryById: function(req, res, next) {
        //parametros de url
        console.log(req.params.id)
        console.log(req.params.categoriaId)
        const producto = {
            id:1,
            name:"moto g"
        }
        res.status(200).json(producto);
    },

    create: async function(req, res, next) {
        try{
            //Body de un request
            console.log(req.body)
            //Insertar en base de datos
            const producto = new productsModel({
                name:req.body.name,
                price:req.body.price,
                description:req.body.description,
                quantity:req.body.quantity,
                category:req.body.category
            })
            const document = await producto.save()
            res.status(201).json(document)
        }catch(e){
            console.log(e)
            res.status(400).json(e)
        }
        
    },

    update: async function(req, res, next) {
        //Body de un request
        console.log(req.params.id)
        console.log(req.body)
        
        try{
            const result = await productsModel.updateOne({_id:req.params.id},req.body)
            
            res.status(201).json(result)
        }catch(e){
            console.log(e)
            res.status(400).json(e)
        }
    },

    delete: async function(req, res, next) {
        try{
            const result = await productsModel.deleteOne({_id:req.params.id})
            
            res.status(200).json(result)
        }catch(e){
            console.log(e)
            res.status(400).json(e)
        }
    }
}