require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const recipesRouter = require('./recipes/recipes-router')
const plannerRouter = require('./planner/planner-router')
const usersRouter = require('./users/users-router')
const authRouter = require('../auth/auth-router')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

//user login
app.use('/api/auth', authRouter)
//user registration
app.use('/api/users', usersRouter)
//recipes
app.use('/api/recipes', recipesRouter)
//meal planner
app.use('/api/planner', plannerRouter)

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
      response = { error: { message: 'server error' } }
    } else {
      console.error(error)
      response = { message: error.message, error }
    }
    res.status(500).json(response)
  })

module.exports = app