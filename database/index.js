const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('newRecipeApp', 'postgres', 'password!', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
  }); 
 
  const db_authentication = async() => {  
    try {
   await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
db_authentication()
const User = sequelize.define(
    'User',
    {   firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        username: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        password_hint: { type: DataTypes.STRING, allowNull: false },
        phone: { type: DataTypes.STRING, allowNull: false },
    },
    { paranoid: false}
    )

const Recipe = sequelize.define(
    'Recipe',
    {   title: { type: DataTypes.STRING, allowNull: false },
        date: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        prep_time: { type: DataTypes.DECIMAL, allowNull: false, defaultValue: 15 },
        cook_time: { type: DataTypes.DECIMAL, allowNull: false, defaultValue: 30 },
        yield: { type: DataTypes.INTEGER, allowNull: false },
        status: { type: DataTypes.ENUM ('unpublished', 'published', 'deleted'), allowNull: false, defaultValue: 'unpublished' },
    },
    { paranoid: true }
    )

const Ingredient = sequelize.define(
    'Ingredient',
    {   name: { type: DataTypes.STRING, allowNull: false },
        unit: { type: DataTypes.STRING},
        quantity: { type: DataTypes.DECIMAL },
    }
)

const recipeInstruction = sequelize.define(
    'recipeInstruction',
    {   title: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: false },
        instruction_steps : { type: DataTypes.TEXT, allowNull: false },
        tips_for_success: { type: DataTypes.TEXT }, //Success  
    }
)
User.hasMany(Recipe, { foreignKey: 'authorId' })  
Recipe.belongsTo(User, { foreignKey: 'authorId' })
Recipe.hasMany(Ingredient, { foreignKey: 'recipeId' })  
Ingredient.belongsTo(Recipe, { foreignKey: 'recipeId' })
Recipe.hasMany(recipeInstruction, { foreignKey: 'recipeId' })
recipeInstruction.belongsTo(Recipe, { foreignKey: 'recipeId' })

sequelize.sync( { alter: true } )

//Creating an instance
const create_user = async (req, res, next) =>{
    const user = await User.create({
        firstName: 'Wale',
        lastName: 'Ade',
        email: 'waleAde@example2.com',
        username: 'Whale    ',
        password: 'password',
        password_hint: 'secret',
        phone: '535-555-5908'
      })
      next()
    }
//Updating an instance
const update_user = async (id) =>{
  const user = await User.update(
      { firstName: 'Babajide', user: 'Tolu' },
      { where: {id: id} }
    )
    console.log(user)
}

//Deleting an instance
const delete_user = async (id) =>{
    const user = await User.destroy(
        { where: {id: id} }
      )
      console.log(user)
}

const get_all_users = async () =>{
    const user = await User.findAll()
    console.log(user.map(user => user.toJSON()))
}
// create_user()
//update_user (13)
//delete_user(1)
// get_all_users()

module.exports = { User, Recipe, create_user,Ingredient, recipeInstruction }