express = require 'express'
app = express()

item = require './routes/item'
category = require './routes/category'
tag = require './routes/tag'
schedule = require './routes/schedule'
program = require './routes/program'

module.exports = (app) ->
	app.get 	'/api/items', item.index
	app.post 	'/api/items', item.create
	app.post	'/api/items/:item_id/by/category', item.createCategory
	app.post 	'/api/items/:item_id/by/tag', item.createTag
	app.get 	'/api/items/:item_id', item.load
	app.get		'/api/items/by/tag', item.listByTag
	app.get		'/api/items/by/date/today', item.listToday
	app.post	'/api/items/by/date', item.listByTargetDate
	app.put 	'/api/items/:item_id', item.update
	app.delete 	'/api/items/:item_id', item.destroy
	app.post 	'/api/items/by/group/occurrence', item.getNextRecurrence

	app.get 	'/api/categories', category.index
	app.post 	'/api/categories', category.create
	app.get 	'/api/categories/:category_id', category.load
	app.put 	'/api/categories/:category_id', category.update
	app.delete 	'/api/categories/:category_id', category.destroy

	app.get 	'/api/tags', tag.index
	app.post 	'/api/tags', tag.create
	app.get 	'/api/tags/:tag_id', tag.load
	app.put 	'/api/tags/:tag_id', tag.update
	app.delete 	'/api/tags/:tag_id', tag.destroy
	
	app.get		'/api/schedules', schedule.index
	app.post	'/api/schedules', schedule.create
	app.get		'/api/schedules/:schedule_id', schedule.load
	app.put		'/api/schedules/:schedule_id', schedule.update
	app.delete	'/api/schedules/:schedule_id', schedule.destroy

	app.get 	'/api/programs', program.index
	app.post 	'/api/programs', program.create
	app.get 	'/api/programs/:program_id', program.load
	app.put 	'/api/programs/:program_id', program.update
	app.post	'/api/programs/:program_id', program.addSchedule
	app.delete 	'/api/programs/:program_id', program.destroy

	