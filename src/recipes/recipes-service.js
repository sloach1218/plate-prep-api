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
  getByUserId(db, userId){
    return RecipesService.getAllRecipes(db)
      .where('recipe.user_id', userId)
      
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
  updateRecipe(db, id, newRecipeFields){
    return db
        .into('pp_recipes')
        .where({id})
        .update(newRecipeFields)
  },
  deleteRecipe(db, id){
    return db
        .from('pp_recipes')
        .where({id})
        .delete()
  },
  deleteRecipeFromPlanner(db, name){
    return db
        .from('pp_planner')
        .select('*')
        .update({
          breakfast: db.raw('array_remove(breakfast, ?)', [name]),
          lunch: db.raw('array_remove(lunch, ?)', [name]),
          dinner: db.raw('array_remove(dinner, ?)', [name]),
          snack: db.raw('array_remove(snack, ?)', [name])
        })
        
  },



  

  
}




module.exports = RecipesService
