const express = require('express')
const RecipesService = require('./recipes-service')
const { requireAuth } = require('../../middleware/jwt-auth')


const recipesRouter = express.Router()
const jsonBodyParser = express.json()

recipesRouter
  .route('/')
  .get(requireAuth, (req, res, next) => {
    RecipesService.getByUserId(req.app.get('db'), req.user.id)
      .then(recipes => {
        res.json(RecipesService.serializeRecipes(recipes))
      })
      .catch(next)
  
  })

  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { name, ingredients, directions } = req.body
    const newRecipe = { name, ingredients, directions }

    newRecipe.user_id = req.user.id

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

    .patch(requireAuth, jsonBodyParser, (req, res, next) => {
      const { name, ingredients, directions } = req.body
      const recipeToUpdate = {  name, ingredients, directions }
      
      const numberOfValues = Object.values(recipeToUpdate).filter(Boolean).length
      if (numberOfValues === 0) {
        return res.status(400).json({
          error: {
            message: `Request body must contain a name`
          }
        })
      }
    
      RecipesService.updateRecipe(
        req.app.get('db'),
        req.body.id,
        recipeToUpdate
      )
        .then(numRowsAffected => {
          res.status(204).end()
        })
        .catch(next)
    })

    .delete(requireAuth, jsonBodyParser, (req, res, next) => {
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
