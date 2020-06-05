const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Planner Endpoints', function() {
  let db

  const {
    testUsers,
    testRecipes,
    testDates
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

  describe(`GET /api/planner`, () => {
    
    
    context(`Given no dates`, () => {
      beforeEach('insert users', () =>
        helpers.seedUsersTables(
          db,
          testUsers
        )
      )
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/planner')
          .set('Authorization', helpers.makeAuthHeader(validUser))
          .expect(200, [])
      })
    })

    context('Given there are dates in the database', () => {
      
      beforeEach('insert dates', () =>
        helpers.seedDatesTable(
          db,
          testUsers,
          testDates
        )
      )
      it('responds with 200 all of the dates', () => {
        const expectedDate = testDates.map(date =>
          helpers.makeExpectedDate(
            testUsers,
            date
          )
        );


        return supertest(app)
          .get('/api/planner')
          .set('Authorization', helpers.makeAuthHeader(validUser))
          .expect(200)
      })
    })


  })
  describe(`POST /api/planner`, () => {
    

    beforeEach('insert users', () =>
        helpers.seedUsersTables(
          db,
          testUsers
        )
      )

    it(`creates a date, responding with 201 and the new date`, function() {
      this.retries(3)
      
      const newDate = {
        date: 'Monday, May 4th',
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: [],
        

      }
      
      return supertest(app)
        .post('/api/planner')
        .set('Authorization', helpers.makeAuthHeader(validUser))
        .send(newDate)
        .expect(201)
        .expect(res => {
          expect(res.body.date).to.eql(newDate.date)
          expect(res.body.breakfast).to.eql(newDate.breakfast)
          expect(res.body.lunch).to.eql(newDate.lunch)
          expect(res.body.dinner).to.eql(newDate.dinner)
          expect(res.body.snack).to.eql(newDate.snack)
        })
    })

  })
 
}) 
