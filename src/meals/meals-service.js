//create service object that performs all CRUD functionality for accessing meals
const MealsService = {
    getAllMeals(knex) {
        return knex
            .select('*')
            .from('meals')
    },
    getSpecificMeal(knex, meal_id) {
        return knex
            .select('*')
            .from('meals')
            .where('meal_id', 'ILIKE', `%${meal_id}`)
            .first()
    },
    getSpecificCategory(knex, category) {
        return knex
            .select('*')
            .from('meals')
            .where('meal_category', 'ILIKE', `%${category}%`)
    },
    getSearchResults(knex, search) {
        return knex
            .select('*')
            .from('meals')
            .where('meal_name', 'ILIKE', `%${search}%`)
    },
    deleteSpecificMeal(knex, meal_id) {
        return knex
            .from('meals')
            .where({ meal_id })
            .delete()
    },
    updateSpecificMeal(knex, meal_id, newMealFields) {
        return knex
            .from('meals')
            .where({ meal_id })
            .update(newMealFields)
    },
    insertNewMeal(knex, newMeal) {
        return knex
            .insert(newMeal)
            .into('meals')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    }
};

module.exports = MealsService