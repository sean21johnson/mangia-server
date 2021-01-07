const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Meals Endpoints', function() {
    let db;

    const { testUsers, testMeals } = helpers.makeMealsFixtures()

    before('make knex instance', () => {
      db = knex({
        client: 'pg',
        connection: process.env.DATABASE_URL_TEST,
      })
      app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))

    describe(`GET /meals`, () => {
      context(`User Validation`, () => {
        beforeEach('insert users & meals', () => {
           return helpers.seedMealsTable(
                db,
                testUsers,
                testMeals
            )
        })
        it(`responds with 200 which indicates that getAllMeals is working correctly`, () => {
            return supertest(app)
                .get('/meals')
                .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                .expect(200)
            })
        })
    })
})