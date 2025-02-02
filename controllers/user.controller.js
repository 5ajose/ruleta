const User = require('./../models/User')

exports.createUser = async(req, res) => {
    try {
        const { username, cash } = req.body
        const userCreated = new User({
            username,
            cash
        })
        userCreated.save()
        return res.status(201).json({
            msg: 'user ' + username + ' created'
        })
    } catch(error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}