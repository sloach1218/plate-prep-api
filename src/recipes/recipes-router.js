const express = require('express')
const RecipesService = require('./recipes-service')

const recipesRouter = express.Router()
const jsonBodyParser = express.json()

recipesRouter
  .route('/')
  .get((req, res, next) => {
    RecipesService.getAllRecipes(req.app.get('db'))
      .then(recipes => {
        res.json(RecipesService.serializeRecipes(recipes))
      })
      .catch(next)
  
  })

  .post(jsonBodyParser, (req, res, next) => {
    const { name, ingredients, directions } = req.body
    const newRecipe = { name, ingredients, directions }
    console.log(newRecipe)


    RecipesService.insertRecipe(
      req.app.get('db'),
      newRecipe
    )
      .then(recipe => {
        res
          .status(201)
          .json(RecipesService.serializeRecipe(recipe))
      })
      .catch(next)
    })

    .delete(jsonBodyParser, (req, res, next) => {
      const { id } = req.body
      RecipesService.deleteRecipe(
        req.app.get('db'),
        id
      )
        .then(numRowsAffected => {
          res.status(204).end()
        })
        .catch(next)
    })


module.exports = recipesRouter
