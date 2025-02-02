const { Schema, model, default: mongoose } = require('mongoose')

const roulleteSchema = new Schema({
    status: {
        type: String,
        required: true,
        default: 'Closed'
    },
    bets: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            amount: {
                type: Number,
            },
            number: {
                type: String
            },
            color: {
                type: String
            }
        }
    ],
    results: {
        type: Array
    }
})

module.exports = model('Roullete', roulleteSchema)