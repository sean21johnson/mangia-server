const express = require('express')
const AuthService = require('./auth-service')
const jsonBodyParser = express.json()

const authRouter = express.Router()

authRouter
   .post('/', jsonBodyParser, (req, res, next) => {
     const { username, password } = req.body
     const loginUser = { username, password }

     for (const [key, value] of Object.entries(loginUser))
       if (value == null)
         return res.status(400).json({
           error: `Missing '${key}' in request body`
         })

      AuthService.getUserWithUserName(
          req.app.get('db'),
          loginUser.username.toLowerCase()
      )
        .then(dbUser => {
            if (!dbUser)
                return res.status(400).json({
                    error: 'Incorrect username or password',
                })
        
        return AuthService.comparePasswords(loginUser.password, dbUser.pass_word)
            .then(compareMatch => {
                if (!compareMatch)
                    return res.status(400).json({
                        error: 'Incorrect username or password'
                    })
                
                const sub = dbUser.username
                const payload = { users_id: dbUser.users_id}
                res.send({
                    authToken: AuthService.createJwt(sub, payload)
                })
            })
        })
        .catch(next)
    })

module.exports = authRouter