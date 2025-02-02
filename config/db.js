const mongoose = require('mongoose')
const mongoUri = process.env.MONGO_URI

exports.databaseConnection = async() => {
    try {
        await mongoose.connect(mongoUri)
        console.log('conectado a la base de datos')
    } catch(error) {
        console.log(error.message)
    }
} 