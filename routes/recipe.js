var express = require('express')
const { Recipe, create_user } = require('../database')
var router = express.Router()


//creating a new recipe
router.post('/',create_user,  async function (req, res, next) {
  const { title, date, description, prep_time, cook_time, yield, status } = req.body
  const result = await Recipe.create({
    title: title,
    date: date,
    description: description,
    prep_time: prep_time,
    cook_time: cook_time,
    yield: yield,
    status: status
  })
  // next()
  res.send(result)
})

// updating a recipe
router.put('/:id', async function (req, res, next) {
  const id = req.params.id
  const { title, date, description, prep_time, cook_time, yield, status } = req.body
  const result = await Recipe.update(
    {
    title: title,
    date: date,
    description: description,
    prep_time: prep_time,
    cook_time: cook_time,
    yield: yield,
    status: status 
  }, 
  {where: { id: id }}
  )
  // res.send(result)
  if (result[0] === 1) {
    res.send('recipe has been updated successfully')
  }
  else {
    res.send('recipe does not exist')
  }

})

//deleting a recipe
router.delete('/:id', async function (req, res, next) {
  const id = req.params.id
  const result = await Recipe.destroy(
    { where: { id: id } }
  )
  // res.status(204).send({result: result})
  if (result === 1) {
    res.send('recipe has been deleted successfully')
  }
  else {
    res.send('recipe does not exist')
  }
})

// Get all recipes
router.get('/', async function (req, res, next) {
 const {status, title} = req.query
 const whereClause = {}
 if (status) {
  whereClause.status = status
 }
 if (title) {
  whereClause.title = title
 }  
 console.log(whereClause)
  const recipes = await Recipe.findAll({where: whereClause})
  res.send(recipes)
})

//Get recipe by id
router.get('/:id', async function (req, res, next) {
  const id = req.params.id
  const recipe = await Recipe.findByPk (id)
  console.log(recipe)
  if (recipe) {
    res.send(recipe)
  } else {
    res.send('recipe does not exist')
  } 
})

//get recipe by title
router.get('/title/:title', async function (req, res, next) {
  const title = req.params.title
  const recipe = await Recipe.findOne({where: {title: title}})
  if (recipe) {
    res.send(recipe)
  } else {
    res.send('recipe does not exist')
  } 
})

module.exports = router
