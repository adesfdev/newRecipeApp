var express = require('express')
const { User } = require('../database')
var router = express.Router()

//creating a new user
router.post('/', async function (req, res, next) {
  const { firstName, lastName, email, username, password, password_hint, phone } = req.body
  const result = await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    username: username,
    password: password,
    password_hint: password_hint,
    phone: phone
    
  })

  res.send(result)
})

//updating a user
router.put('/:id', async function (req, res){
  const id = req.params.id
  const { firstName, lastName, email, username, password, password_hint, phone } = req.body
  const result = await User.update(
    {
    firstName: firstName,
    lastName: lastName,
    email: email,
    username: username,
    password: password,
    password_hint: password_hint,
    phone: phone
  }, 
  {where: { id: id }
  })
  // res.send(result)
  if (result[0] === 0 ) {
    res.send('user does not exist')
  }
  else {
    res.send('user has been updated successfully')
  }
})  

//deleting a user
router.delete('/:id', async function (req, res) {
  const id = req.params.id
  const result = await User.destroy(
    { where: { id: id } }
  )
  if (result[0] === 0 ) {
    res.send('user does not exist')
  }
  else {
    res.send('user has been deleted successfully')
  }
  res.send(result)
})

//get user by firstName
router.get('/firstName/:firstName', async function (req, res, next) {
  const firstName = req.params.firstName
  const user = await User.findOne({where: {firstName: firstName}})
  if (user) {
    res.send(user)
  } else {
    res.send('user does not exist')
  } 
})

//get all users
router.get('/', async function (req, res, ) {
  const limit = 5
  const offset = 2
  const result = await User.findAndCountAll({ limit: 5, offset : 2})
  res.send(result)
})
module.exports = router
