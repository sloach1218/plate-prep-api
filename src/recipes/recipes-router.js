const express = require('express')
const RecipesService = require('./recipes-service')

const recipesRouter = express.Router()
//const jsonBodyParser = express.json()

recipesRouter
  .route('/')
  .get((req, res, next) => {
    RecipesService.getAllRecipes(req.app.get('db'))
      .then(recipes => {
        res.json(RecipesService.serializeRecipes(recipes))
      })
      .catch(next)
  
  })


module.exports = recipesRouter
