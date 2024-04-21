const { Sequelize, DataTypes } = require('sequelize');
const { UPDATE } = require('sequelize/lib/query-types');
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
        apassword_hint: { type: DataTypes.STRING, allowNull: false },
        phone: { type: DataTypes.STRING, allowNull: false },
    },
    { paranoid: true }
    )

const Recipe = sequelize.define(
    'Recipe',
    {   title: { type: DataTypes.STRING, allowNull: false },
        date: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        prep_time: { type: DataTypes.DECIMAL, allowNull: false, defaultValue: 15 },
        cook_time: { type: DataTypes.DECIMAL, allowNull: false, defaultValue: 30 },
        yield: { type: DataTypes.INTEGER, allowNull: false },
    },
    { paranoid: true }
    )
User.hasMany(Recipe, { foreignKey: 'authorId' })
Recipe.belongsTo(User, { foreignKey: 'authorId' })
sequelize.sync( { alter: true } )

//Creating an instance
const create_user = async () =>{
    const user = await User.create({
        firstName: 'Tolu',
        lastName: 'Oloyede',
        email: 'oloyede@example2.com',
        username: 'Tolu    ',
        password: 'password',
        apassword_hint: 'secret',
        phone: '535-555-5908'
      })
      console.log(user)
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
//create_user()
//update_user (13)
//delete_user(1)
get_all_users()
