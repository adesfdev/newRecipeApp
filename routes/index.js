var express = require('express')
const userRouter = require('./users')
const recipeRouter = require('./recipe')
const recipeInstructionRouter = require('./instructions')
const ingredientRouter = require('./ingredients')

var router = express.Router()

/* GET home page. */
router.use('/users', userRouter)
router.use('/recipes', recipeRouter)
router.use('/ingredients', ingredientRouter)
router.use('/instructions', recipeInstructionRouter)



module.exports = router
