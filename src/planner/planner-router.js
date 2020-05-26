const express = require('express')
const PlannerService = require('./planner-service')

const plannerRouter = express.Router()
//const jsonBodyParser = express.json()

plannerRouter
  .route('/')
  .get((req, res, next) => {
    PlannerService.getAllDates(req.app.get('db'))
      .then(dates => {
        res.json(PlannerService.serializeDates(dates))
      })
      .catch(next)
  
  })


module.exports = plannerRouter
