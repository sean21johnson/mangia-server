const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
    return [
        {
            users_id: '3',
            first_name: 'billy',
            last_name: 'bob',
            email: 'billybob@gmail.com',
            username: 'billybob',
            pass_word: 'Mangia123!',
            date_created: new Date('2029-01-22T16:28:32.615Z')
        },
        {
            users_id: '4',
            first_name: 'joey',
            last_name: 'blogs',
            email: 'joeyblogs@gmail.com',
            username: 'joeyblogs',
            pass_word: 'Mangia123!',
            date_created: new Date('2029-01-22T16:28:32.615Z')
        }
    ]
}

function makeMealsArray(userInput) {
    return [
        {
            meal_id: '800',
            meal_image: 'https://imgur.com/5H9JNVN.jpg',
            meal_name: 'Bacon egg and cheese',
            meal_category: 'Breakfast',
            meal_description: 'Amazing BEC with hashbrown',
            meal_time: new Date('2029-01-22T16:28:32.615Z'),
            users_id: userInput[0].users_id
        },
        {
            meal_id: '200',
            meal_image: 'https://imgur.com/IywOABd.jpg',
            meal_name: 'Buffalo Chicken Dip',
            meal_category: 'Snack',
            meal_description: 'Great buffalo chicken dip appetizer',
            meal_time: new Date('2029-01-22T16:28:32.615Z'),
            users_id: userInput[1].users_id
        }
    ]
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ users_id: user.users_id }, secret, {
        subject: user.username,
        algorithm: 'HS256',
    })
    return `mangia-client-auth-token ${token}` 
}

function makeMealsFixtures() {
    const testUsers = makeUsersArray()
    const testMeals = makeMealsArray(testUsers)
    return { testUsers, testMeals }
}

function cleanTables(db) {
    return db.transaction(trx => 
        trx.raw(
            `TRUNCATE
                users,
                meals`
        )
    )
}

async function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
        ...user,
        pass_word: bcrypt.hashSync(user.pass_word, 1)
    }))
    await db.into('users').insert(preppedUsers)
}

function seedMealsTable(db, users, meals) {
    return db.transaction(async trx => {
        await seedUsers(trx, users)
        await trx.into('meals').insert(meals)
    })
}


module.exports = {
    seedMealsTable,
    seedUsers,
    cleanTables,
    makeAuthHeader,
    makeMealsArray,
    makeUsersArray,
    makeMealsFixtures
}