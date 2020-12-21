const express = require('express')
const uuid = require('uuid')
const logger = require('../logger')
const MealsService = require('./meals-service')

const mealsRouter = express.Router()
const bodyParser = express.json()

mealsRouter
    .route('/meals')
    .get((req, res, next) => {
        MealsService.getAllMeals(req.app.get('db'))
        .then(meals => {
            res.json(meals)
        })
        .catch(next)
    })

    .post(bodyParser, (req, res, next) => {
        for (let field of ['meal_image', 'meal_name', 'meal_category', 'meal_description']) {
            if (!req.body[field]) {
                logger.error(`${field} is required`)
                return res
                    .status(400)
                    .send(`${field} is required`)
            }
        }
        const { meal_image, meal_name, meal_category, meal_description } = req.body
        const newMeal = {
            meal_id: uuid.v4(),
            meal_image,
            meal_name,
            meal_category,
            meal_description,
            meal_time: new Date()
        }
        MealsService.insertNewMeal(req.app.get('db'), newMeal)
        .then(meal => {
            logger.info(`Meal with id ${newMeal.meal_id} created`)
            res
                .status(201)
                .location(`/meals/${newMeal.meal_id}`)
                .json(meal)
        })
        .catch(next)
    })

mealsRouter
    .route('/meals/:id')
    .get((req, res, next) => {
        const { id } = req.params
        
        MealsService.getSpecificMeal(req.app.get('db'), id)
            .then(meal => {
                if (!meal) {
                    logger.error(`Meal with id ${id} not found`)
                    return res
                        .status(404)
                        .json({
                            error: { message: `Meal not found`}
                        })
                }
                return res.json(meal)
            })
        .catch(next)
    })

    .delete((req, res, next) => {
        const { id } = req.params

        MealsService.deleteSpecificMeal(req.app.get('db'), id)
            .then(meal => {
                if (!meal) {
                    logger.error(`Meal with id ${id} not found`)
                    return res
                        .status(404)
                        .json({
                            error: { message: `Meal not found`}
                        })
                }
                logger.info(`Meal with id ${id} deleted from meal collection`)
                    return res
                        .status(204)
                        .end()
            })
            .catch(next)
    })
        
    .patch(bodyParser, (req, res, next) => {
        const { meal_id, meal_image, meal_name, meal_category, meal_description } = req.body
        const mealToUpdate = { meal_id, meal_image, meal_name, meal_category, meal_description, meal_time: new Date() }
        const numberOfValues = Object.values(mealToUpdate).filter(Boolean).length
        
        if (numberOfValues === 0) {
            logger.error(`Invalid update without required fields`)
            return res
                .status(400)
                .json({
                    error: {
                        message: `Request body must contain either 'meal_id', 'meal_image', 'meal_name', meal_category', or 'meal_description'`
                    }
                })
        }
        MealsService.updateSpecificMeal(req.app.get('db'), req.params.id, mealToUpdate)
            .then(meal => {
                return res
                    .status(200)
                    .json(meal)
                    .end()
            })
            .catch(next)
    })


module.exports = mealsRouter