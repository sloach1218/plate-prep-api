const express = require('express')
const PlannerService = require('./planner-service')
const { requireAuth } = require('../../middleware/jwt-auth')


const plannerRouter = express.Router()
const jsonBodyParser = express.json()

plannerRouter
  .route('/')
  .get(requireAuth, (req, res, next) => {
    //get meal plan associated with logged in user
    PlannerService.getByUserId(req.app.get('db'), req.user.id)
      .then(dates => {
        res.json(PlannerService.serializeDates(dates))
      })
      .catch(next)
  })

  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { date, breakfast, lunch, dinner, snack } = req.body
    const newMeal = { date, breakfast, lunch, dinner, snack }

    newMeal.user_id = req.user.id

    //check if meal planner date exists, if does - update it, if not - create it
    PlannerService.getByDate(
      req.app.get('db'),
      date
    )
      .then((date) => {
        if(!date){
          PlannerService.insertMeal(
            req.app.get('db'),
            newMeal
          )
            .then(meal => {
              res
                .status(201)
                .json(PlannerService.serializeDate(meal))
            })
            .catch(next)
        } else {
          PlannerService.updateDate(
            req.app.get('db'),
            date.date,
            newMeal
          )
            .then(numRowsAffected => {
              res.status(204).end()
            })
            .catch(next)
        }
      })
  })

  


module.exports = plannerRouter
