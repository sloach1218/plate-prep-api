const xss = require('xss')
const Treeize = require('treeize')

const PlannerService = {
  getAllDates(db) {
    return db
      .from('pp_planner AS date')
      .select(
        'date.date',
        'date.breakfast',
        'date.lunch',
        'date.dinner',
        'date.snack',

      )
      
  },

  

  serializeDates(dates) {
    return dates.map(this.serializeDate)
  },

  serializeDate(date) {
    const dateTree = new Treeize()

    const dateData = dateTree.grow([ date ]).getData()[0]

    return {
      date: xss(dateData.date),
      breakfast: dateData.breakfast,
      lunch: dateData.lunch,
      dinner: dateData.dinner,
      snack: dateData.snack,
    }
  },
  insertMeal(db, newDate) {
    return db
      .insert(newDate)
      .into('pp_planner')
      .returning('*')
      .then(([meal]) => meal)
      
  },
  updateDate(db, date, newMeals){
    return db
        .into('pp_planner')
        .where({date})
        .update(newMeals)
  },
  getByDate(db, date) {
    return PlannerService.getAllDates(db)
      .where({date})
      .first()
  },

  
}




module.exports = PlannerService
