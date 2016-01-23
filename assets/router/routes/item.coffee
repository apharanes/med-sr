#
# Items are topics that are scheduled within a set of repetitions.
# They can be tagged or categorized for easy searching and filtering.
#
# @namespace Routes
# @exports Item
#
express = require 'express'
moment = require 'moment'
_ = require 'lodash'
Item = require '../../models/item'
Tag = require '../../models/tag'
Category = require '../../models/category'
Program = require '../../models/program'
Schedule = require '../../models/schedule'

generateRecurrences = (startDate, programs, callback) ->
	recurrences = []

	Program.findById(programs[0])
		.populate('schedules')
		.exec (err, program) ->
			if err 
				console.error(err)
			else
				sortedSchedules = _.sortBy(program.schedules, 'recurrence')

				nextDate = moment(startDate).startOf('day')
				recurrences.push(new Date(nextDate.valueOf()))

				_.each(sortedSchedules,
					(schedule) ->	
						if schedule.period > -1
							for i in [1..schedule.period]
								nextDate = moment(nextDate).add(schedule.recurrence, 'days').startOf('day')
								recurrences.push(new Date(nextDate.valueOf()))
						else
							while nextDate.isBefore('2017/12/31')
								nextDate = moment(nextDate).add(schedule.recurrence, 'days').startOf('day')
								recurrences.push(new Date(nextDate.valueOf()))
				)
			callback(recurrences)


#
# List items
#
exports.index = (req, res) ->
	Item.find()
		.populate('tags categories programs')
		.exec (err, items) ->
			if err then res.send(err)
			else res.send(items)

#
# Create item
# 
exports.create = (req, res) ->
	item = new Item(req.body)

	generateRecurrences(item.startDate, item.programs, (recurrences) ->
		item.recurrences =  recurrences
		
		return item.save (err) ->
			if (err) 
				console.error(err)
				res.send(err)
			else 
				item.populate('tags categories programs', 
					(err) ->
						if (err)
							console.error(err)
							res.send(err)
						else
							res.send(item)
					)
	)

#
# Create new {@link Tag} for this Item
#
# @param {ObjectId} req.params.item_id
#
exports.createTag = (req, res) ->
	tag = new Tag(req.body)

	Item.findByIdAndUpdate( 
		req.params.item_id, 
		{ $push: { 'tags': tag }},
		{ safe: true, upsert: true, new: true },
		(err, item) ->
			if err then res.send(err)
			else res.json 'Successfully added tag ' + tag.name + ' to Item ' + item._id
	)
#
# Create new {@link Category} for this Item
#
# @param {ObjectId} req.params.item_id
#
exports.createCategory = (req, res) ->
	category = new Category(req.body)

	Item.findByIdAndUpdate( 
		req.params.item_id, 
		{ $push: { 'categories': category }},
		{ safe: true, upsert: true, new: true },
		(err, item) ->
			if err then res.send(err)
			else res.json 'Successfully added category ' + category._id + ' to Item ' + item._id
	)

#
#  Load item
#  
exports.load = (req, res) ->
	Item.findById req.params.item_id, (err, item) ->
		if err then res.send(err)
		else res.json(item)

#
# List all {@link Item} with a given Tag
# @param {ObjectId} req.params.item_id - Item id
#
exports.listByTag = (req, res) ->
	return Item.find { tags: req.params.tag_id }, (err, item) ->
		if err then res.send(err)
		else res.json(item)

exports.listToday = (req, res) ->
	today = moment().startOf('day')
	tomorrow = moment(today).add(1, 'days')

	return Item
		.populate('programs')
		.find({ startDate: { $lt: tomorrow.toDate(), $gte: today.toDate() }})
		.exec (err, items) ->
			if (err) then res.send(err)
			else res.send(items)


exports.listByTargetDate = (req, res) ->
	date = parseInt(req.body.date)
	target = moment(date).startOf('day')
	console.log(target.toDate())
	tomorrow = moment(target).add(1, 'days')
	console.log(tomorrow.toDate())

	return Item
		.find({ recurrences: { $elemMatch: { $lt: tomorrow.toDate(), $gte: target.toDate() } }})
		.populate('programs categories tags')
		.exec (err, items) ->
			if (err)
				console.error(err)
				res.send(err)
			else res.send(items)

#
#  Update item
#  
exports.update = (req, res) ->
	return Item.findOne { _id: req.params.item_id }, (err, item) ->
		if err then res.send(err)
		else
			for prop in req.body
				item[prop] = req.body[prop]
		
		return item.save (err) ->
			if err then res.send(err)
			else res.json(message: 'Item updated')

#
#  Delete item 
# 
exports.destroy = (req, res) ->
	return Item.remove _id: req.params.item_id, (err, item) ->
		if err then res.send(err)
		else res.json 'Successfully deleted item ' + item._id
