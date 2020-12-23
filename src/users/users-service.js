const xss = require('xss')
const bcrypt = require('bcryptjs')
const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/

const UsersService = {

    hasUserWithUserName(knex, username) {
        return knex
            .where({ username })
            .from('users')
            .first()
            .then(user => !!user)
    },

    insertUser(knex, newUser) {
        return knex
            .insert(newUser)
            .into('users')
            .returning('*')
            .then(([user]) => user)
    },

    validatePassword(password) {
        if (password.length < 8) {
            return 'Password must be a minimum of 8 characters'
        }
        if (password.length > 25) {
            return 'Password cannot be more than 25 characters'
        }
        if (password.startsWith(' ') || password.endsWith(' ')) {
            return 'Password must not start or end with empty spaces'
        }
        if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
            return 'Pasword must contain 1 upper case, lower case, number and special character'
        }
        return null
    },

    hashPassword(password) {
        return bcrypt.hash(password, 12)
    },

    serializeUser(user) {
        return {
            id: user.id,
            first_name: xss(user.first_name),
            last_name: xss(user.last_name),
            email: xss(user.email),
            username: xss(user.username),
            pass_word: xss(user.pass_word),
            date_created: new Date(user.date_created)
        }
    },
}

module.exports = UsersService