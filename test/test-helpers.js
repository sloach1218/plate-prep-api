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

function makeDatesArray(users) {
  return [
    {
      date: 'Monday, May 4th',
      breakfast: ['First test recipe', 'Second test recipe'],
      lunch: [],
      dinner: ['First test recipe', 'Third test recipe'],
      snack: ['Fourth test recipe'],
      user_id: users[0].id,
    },
    {
      date: 'Tuesday, May 5th',
      breakfast: [],
      lunch: [],
      dinner: ['Third test recipe'],
      snack: [],
      user_id: users[1].id,
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

function makeExpectedDate(users, date) {
  const user = users
    .find(user => user.id === date.user_id)

  return {
    date: date.date,
    breakfast: date.breakfast,
    lunch: date.lunch,
    dinner: date.dinner,
    snack: date.snack,
    user: user.id,
  }
}




function makeRecipesFixtures() {
  const testUsers = makeUsersArray()
  const testRecipes = makeRecipesArray(testUsers)
  const testDates = makeDatesArray(testUsers)
  return { testUsers, testRecipes, testDates }
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

function seedPlannerTable(db, dates) {
  return db
    .into('pp_planner')
    .insert(dates)
}
function seedDatesTable(db, users, dates) {
  return db
    .into('pp_users')
    .insert(users)
    .then(() =>
      db
        .into('pp_planner')
        .insert(dates)
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
  makeDatesArray,
  makeExpectedDate,

  makeRecipesFixtures,
  cleanTables,
  seedRecipesTables,
  seedUsersTables,
  seedPlannerTable,
  seedDatesTable,
  makeAuthHeader
}
