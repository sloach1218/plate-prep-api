const config = require('../src/config')




function makeRecipesArray() {
  return [
    {
      id: 1,
      name: 'First test recipe',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      name: 'Second test recipe',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 3,
      name: 'Third test recipe',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 4,
      name: 'Fourth test recipe',
      date_created: '2029-01-22T16:28:32.615Z',
    },
  ]
}





function makeExpectedRecipe( recipe) {
  

  return {
    id: recipe.id,
    name: recipe.name,
    date_created: recipe.date_created,
    
  }
}






function makeRecipesFixtures() {
  const testRecipes = makeRecipesArray()
  return { testRecipes }
}


function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      pp_recipes
      RESTART IDENTITY CASCADE`
  )
}


function seedRecipesTables(db, recipes) {
  return db
    
        .into('pp_recipes')
        .insert(recipes)
    
   
}





module.exports = {
  makeRecipesArray,
  makeExpectedRecipe,

  makeRecipesFixtures,
  cleanTables,
  seedRecipesTables,
}
