var express = require('express');
var router = express.Router();
const usuariosController = require("../controllers/usuariosController")


router.post('/', usuariosController.create);
router.post('/login', usuariosController.login);

module.exports = router;
