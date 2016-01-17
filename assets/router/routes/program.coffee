#
#	Programs are a set of schedules for an item to follow.
#
# @namespace Routes
# @exports Program
#
express = require 'express'
Program = require '../../models/program'
Schedule = require '../../models/schedule'

#
# List programs
#
exports.index = (req, res) ->
	Program.find()	
		.populate('schedules')
		.exec (err, programs) ->
			if err then res.send(err)
			else res.send(programs)

#
# Create program
#
exports.create = (req, res) ->
	program = new Program(req.body)
	
	return program.save (err) ->
		if err then res.send(err)
		else 
			program.populate('schedules', 
				(err) ->
					if (err)
						console.log(err)
						res.send(err)
					else
						res.send(program)
				)

#
# Load program
#
exports.load = (req, res) ->
	Program.findById req.params.program_id, (err, program) ->
		if err then res.send(err)
		else res.json(program)

#
# Update program
#
exports.update = (req, res) ->
	return Program.findOne _id: req.params.program_id, (err, program) ->
		if err then res.send(err)
		else
			for prop in req.body
				program[prop] = req.body[prop]
		
		return program.save (err) ->
			if err then res.send(err)
			else res.json(program)

#
# Add schedule to Program
#
exports.addSchedule = (req, res) ->
	schedule = new Schedule(req.body)

	Program.findByIdAndUpdate(
		req.params.program_id
		{ $push: { 'schedules': schedule }},
		{ safe: true, upsert: true, new: true },
		(err, item) ->
			if err then res.send(err)
			else res.json(schedule)
	)

#
# Delete program
#
exports.destroy = (req, res) ->
	return Program.remove _id: req.params.program_id, (err, program) ->
		if err then res.send(err)
		else res.json 'Successfully deleted program ' + program._id
