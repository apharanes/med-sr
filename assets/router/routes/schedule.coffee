#
#	Schedule is a rule for repeating an item.
#
express = require 'express'
Schedule = require '../../models/schedule'

### List schedules ###
exports.index = (req, res) ->
	Schedule.find (err, schedules) ->
		if err then res.send(err)
		else res.json(schedules)

#
# Create schedule
#
exports.create = (req, res) ->
	schedule = new Schedule(req.body)
	
	return schedule.save (err) ->
		if (err)  
			res.send(err)
			console.log(err)
		else res.send(schedule)
	

### Load schedule ###
exports.load = (req, res) ->
	Schedule.findById req.params.schedule_id, (err, schedule) ->
		if err then res.send(err)
		else res.json(schedule)

### Update schedule ###
exports.update = (req, res) ->
	return Schedule.findOne _id: req.params.schedule_id, (err, schedule) ->
		if err then res.send(err)
		else
			for prop in req.body
				schedule[prop] = req.body[prop]
				
			return schedule.save (err) ->
				if err then res.send(err)
				else res.json(message: 'Schedule updated')

### Delete schedule ###
exports.destroy = (req, res) ->
	return Schedule.remove _id: req.params.schedule_id, (err, schedule) ->
		if err then res.send(err)
		else res.json 'Successfully deleted schedule item ' + req.params.schedule_id

