const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Recipes Endpoints', function() {
  let db

  const {
    testUsers,
    testRecipes,
  } = helpers.makeRecipesFixtures()

  const validUser = testUsers[0];

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
      beforeEach('insert users', () =>
        helpers.seedUsersTables(
          db,
          testUsers
        )
      )
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/recipes')
          .set('Authorization', helpers.makeAuthHeader(validUser))
          .expect(200, [])
      })
    })

    context('Given there are recipes in the database', () => {
      
      beforeEach('insert recipes', () =>
        helpers.seedRecipesTables(
          db,
          testUsers,
          testRecipes
        )
      )
      it('responds with 200 all of the recipes', () => {
        const expectedRecipes = testRecipes.map(recipe =>
          helpers.makeExpectedRecipe(
            testUsers,
            recipe
          )
        );


        return supertest(app)
          .get('/api/recipes')
          .set('Authorization', helpers.makeAuthHeader(validUser))
          .expect(200, expectedRecipes)
      })
    })


  })
  describe(`POST /api/recipes`, () => {
    

    beforeEach('insert users', () =>
        helpers.seedUsersTables(
          db,
          testUsers
        )
      )

    it(`creates a recipe, responding with 201 and the new recipe`, function() {
      this.retries(3)
      
      const newRecipe = {
        name: 'New Recipe',
        ingredients: [],
        directions: [],
        

      }
      
      return supertest(app)
        .post('/api/recipes')
        .set('Authorization', helpers.makeAuthHeader(validUser))
        .send(newRecipe)
        .expect(201)
        .expect(res => {
          expect(res.body.name).to.eql(newRecipe.name)
          expect(res.body.ingredients).to.eql(newRecipe.ingredients)
          expect(res.body.directions).to.eql(newRecipe.directions)
          expect(res.body).to.have.property('id')
        })
    })

  })
  describe(`PATCH /api/recipes`, () => {
    context(`Given no recipes`, () => {
      beforeEach('insert users', () =>
        helpers.seedUsersTables(
          db,
          testUsers
        )
      )
      it(`responds with 400`, () => {
        return supertest(app)
          .patch(`/api/recipes`)
          .set('Authorization', helpers.makeAuthHeader(validUser))
          .expect(400, { error: { message: `Request body must contain a name` } })
      })
    })

    context('Given there are recipes in the database', () => {

      beforeEach('insert recipes', () =>
        helpers.seedRecipesTables(
          db,
          testUsers,
          testRecipes
        )
      )
      it(`responds with 400 when no required fields supplied`, () => {
        
        return supertest(app)
          .patch(`/api/recipes`)
          .set('Authorization', helpers.makeAuthHeader(validUser))
          .send({ irrelevantField: 'foo' })
          .expect(400, {
            error: {
              message: `Request body must contain a name`
            }
          })
      })

      it('responds with 204 and updates the recipe', () => {
        const updatePlant = {
          name: 'updated recipe name',
          ingredients: [],
          directions: [],
          id: 2,
        }

        return supertest(app)
          .patch(`/api/recipes`)
          .set('Authorization', helpers.makeAuthHeader(validUser))
          .send(updatePlant)
          .expect(204)
          
      }) 

      

    })
  })
  describe('DELETE /api/recipes', () => {

    context('Given there are recipes in the database', () => {

      beforeEach('insert recipes', () => {
        helpers.seedRecipesTables(
          db,
          testUsers,
          testRecipes
        )
      })

      it('removes the recipe by ID from the store', () => {
        const idToRemove = {id:2}
        return supertest(app)
          .delete(`/api/recipes`)
          .send(idToRemove)
          .set('Authorization', helpers.makeAuthHeader(validUser))
          .expect(204)
          
      })
    })
  })
}) 
