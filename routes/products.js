var express = require('express');
var router = express.Router();
const productsController = require("../controllers/productsController");


router.get('/', productsController.getAll);

router.get('/:id', productsController.getById);

router.get('/:id/categorias/:categoriaId', productsController.getCategoryById);

router.post('/',(req,res,next)=>{req.app.verifyToken(req,res,next)}, productsController.create);
router.put('/:id',(req,res,next)=>{req.app.verifyToken(req,res,next)}, productsController.update);
router.delete('/:id',(req,res,next)=>{req.app.verifyToken(req,res,next)}, productsController.delete);

module.exports = router;
