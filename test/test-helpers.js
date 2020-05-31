const config = require('../src/config')
const jwt = require('jsonwebtoken')





function makeRecipesArray(users) {
  return [
    {
      id: 1,
      name: 'First test recipe',
      ingredients: [],
      directions: [],
      user_id: users[0].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      name: 'Second test recipe',
      ingredients: [],
      directions: [],
      user_id: users[1].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 3,
      name: 'Third test recipe',
      ingredients: [],
      directions: [],
      user_id: users[2].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 4,
      name: 'Fourth test recipe',
      ingredients: [],
      directions: [],
      user_id: users[3].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
  ]
}

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      password: 'password1!',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      user_name: 'test-user-2',
      password: 'password2',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 3,
      user_name: 'test-user-3',
      password: 'password3',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 4,
      user_name: 'test-user-4',
      password: 'password4',
      date_created: '2029-01-22T16:28:32.615Z',
    },
  ]
}





function makeExpectedRecipe(users, recipe) {
  const user = users
    .find(user => user.id === recipe.user_id)

  return {
    id: recipe.id,
    name: recipe.name,
    ingredients: recipe.ingredients,
    directions: recipe.directions,
    user: user.id,
    date_created: recipe.date_created,
    
  }
}






function makeRecipesFixtures() {
  const testUsers = makeUsersArray()
  const testRecipes = makeRecipesArray(testUsers)
  return { testUsers, testRecipes }
}


function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      pp_recipes,
      pp_users
      RESTART IDENTITY CASCADE`
  )
}


function seedRecipesTables(db, users, recipes) {
  return db
    .into('pp_users')
    .insert(users)
    .then(() =>
      db
        .into('pp_recipes')
        .insert(recipes)
    )
    
   
}
function seedUsersTables(db, users) {
  return db
    .into('pp_users')
    .insert(users)
   
}

function makeAuthHeader(user, secret = config.JWT_SECRET){
  const token = jwt.sign({ user_id:user.id}, secret, {
    subject: user.user_name,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}





module.exports = {
  makeRecipesArray,
  makeExpectedRecipe,
  makeUsersArray,

  makeRecipesFixtures,
  cleanTables,
  seedRecipesTables,
  seedUsersTables,
  makeAuthHeader
}
