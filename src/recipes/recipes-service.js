const xss = require('xss')
const Treeize = require('treeize')

const RecipesService = {
  getAllRecipes(db) {
    return db
      .from('pp_recipes AS recipe')
      .select(
        'recipe.id',
        'recipe.name',
        'recipe.ingredients',
        'recipe.directions',
        'recipe.date_created',

      )
      
  },

  

  serializeRecipes(recipes) {
    return recipes.map(this.serializeRecipe)
  },

  serializeRecipe(recipe) {
    const recipeTree = new Treeize()

    const recipeData = recipeTree.grow([ recipe ]).getData()[0]

    return {
      id: recipeData.id,
      name: xss(recipeData.name),
      ingredients: recipeData.ingredients,
      directions: recipeData.directions,
      date_created: recipeData.date_created,
    }
  },
  insertRecipe(db, newRecipe) {
    return db
      .insert(newRecipe)
      .into('pp_recipes')
      .returning('*')
      .then(([recipe]) => recipe)
      
  },
  deleteRecipe(db, id){
    return db
        .from('pp_recipes')
        .where({id})
        .delete()
  },

  
}




module.exports = RecipesService