const express = require('express')
const router = express.Router()
const roulleteController = require('./../controllers/roullete.controller')

router.post('/create-roullete', roulleteController.createRoullete)

router.post('/calculate-roullete/:id', roulleteController.betRoulletAndCalculateWinners)

router.put('/open-roullete/:id', roulleteController.openRoullete)

module.exports = router