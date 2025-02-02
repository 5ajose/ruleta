const Roullete = require('./../models/Roullete')
const User = require('./../models/User')

exports.createRoullete = async(req, res) => {
    try {
        const roullete = await new Roullete({
            bet: [],
            results: []
        })
        roullete.save()
        console.log(roullete)
        return res.status(201).json({
            id: roullete._id
        })
    }
    catch(error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}

exports.openRoullete = async(req, res) => {
    try {
        const id = req.params.id
        const roullete = await Roullete.findByIdAndUpdate({ _id: id }, { status: 'Open' })
        return res.status(200).json({
            msg: 'Roullete whith ID ' + roullete._id + ' has been opened'
        })
    }
    catch(error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}

exports.betRoulletAndCalculateWinners = async(req, res) => {
    try {
        const id = req.params.id
        const bets = req.body.bets

        const roullete = await Roullete.findById(id)
        
        if(!roullete) return res.status(404).json({
            msg: 'Roullete not found!'
        })
        if(roullete.status == 'Closed') return res.status(400).json({
            msg: 'Roullete is closed!'
        })
        // const winnerNumber = Math.floor(Math.random() * 37)
        // const winnerColor = winnerNumber % 2 === 0 ? "rojo" : "negro"
        const winnerNumber = 5
        // const winnerColor = "negro"
        let winnerColor;
        if(winnerNumber % 2 === 0) {
            winnerColor = "rojo"
        } else {
            winnerColor = "negro"
        }
        for(let bet of bets) {
            if(bet.amount > 10000){
                throw new Error('Max quantitty for bet is 10000USD')
            }
            if(bet.amount <= 0){
                throw new Error('Minimal quantity for bet has to be greather than zero')
            }
            if(bet.number < 0 || bet.number > 36) {
                throw new Error('Only bet with numbers in range between 0 and 36')
            }

            const user = await User.findById(bet.user)
            if(user.cash < bet.amount) {
                throw new Error('Insuficient Founds!!')
            }
            const isWinnerNumber = bet.number == winnerNumber
            if(isWinnerNumber) {
                console.log('usuario gano')
                let total = bet.amount * 5
                user.cash += total
                await user.save()
            } else {
                user.cash -= bet.amount
                await user.save()
            }
            const isWinnerColor = bet.color == winnerColor
            if (isWinnerColor) {
                let total = bet.amount * 1.8 
                user.cash += total
                await user.save()
            }
            console.log(winnerNumber)
            
        }
    }
    catch(error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}