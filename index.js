const express = require('express')
const app = express()
const dotenv = require('dotenv')
const userRoutes = require('./routes/user.routes')
const roulleteRoutes = require('./routes/roullete.routes')
dotenv.config()
const db = require('./config/db')
const port = process.env.PORT

db.databaseConnection()
app.use(express.json())
app.use('/api', userRoutes)
app.use('/api', roulleteRoutes)


app.listen(port, () => {
    try {
        console.log('Puerto conectado en ' + port)
    } catch(error) {
        console.log(error.message)
    }
})