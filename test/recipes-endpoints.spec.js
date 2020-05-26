const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Recipes Endpoints', function() {
  let db

  const {
    testRecipes,
  } = helpers.makeRecipesFixtures()


  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })
  
  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`GET /api/recipes`, () => {
    
    
    context(`Given no recipes`, () => {
      
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/recipes')
          .expect(200, [])
      })
    })

    context('Given there are recipes in the database', () => {
      beforeEach('insert recipes', () =>
        helpers.seedRecipesTables(
          db,
          testRecipes
        )
      )
      it('responds with 200 all of the recipes', () => {
        
        const expectedRecipes = testRecipes.map(recipe =>
          helpers.makeExpectedRecipe(
            recipe
          )
        );


        return supertest(app)
          .get('/api/recipes')
          .expect(200, expectedRecipes)
      })
    })


  })
}) 
