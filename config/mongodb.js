const mongoose = require("mongoose");
require('dotenv').config(); // Cargar las variables del archivo .env

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("Conectado");
})
.catch((error) => console.log(error));

module.exports = mongoose;