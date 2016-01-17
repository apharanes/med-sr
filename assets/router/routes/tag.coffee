#
# Tags are keywords associated to an item. This used for easy searching and filtering items.
# Keywords are more time-specific than Categories.
#
# @namespace Routes
# @exports Tag
#
express = require 'express'
Tag = require '../../models/tag'

#
# List all Tags
#
exports.index = (req, res) ->
	Tag.find (err, tags) ->
		if err then res.send(err)
		else res.json(tags)

#
# Create Tag
# @param {Object} req.body - Tag
#
exports.create = (req, res) ->
	tag = new Tag(req.body)
	
	return tag.save (err) ->
		if (err) then res.send(err)
		else res.send(message: 'Tag created with id ' + tag._id)
			
#
# Load Tag
# @param {string} req.params.tag_id - Tag id
#
exports.load = (req, res) ->
	Tag.findById req.params.tag_id, (err, tag) ->
		if err then res.send(err)
		else res.json(tag)
			
#
# Update Tag
# @param {string} req.params.tag_id
# @param {Object} req.body - Tag
#
exports.update = (req, res) ->
	return Tag.findOne _id: req.params.tag_id, (err, tag) ->
		if err then res.send(err)
		else
			for prop in req.body
				tag[prop] = req.body[prop]
			
			return tag.save (err) ->
				if err then res.send(err)
				else res.json(message: 'Tag updated')

#
# Delete Tag
# @param {string} req.params.tag_id
#
exports.destroy = (req, res) ->
	return Tag.remove _id: req.params.tag_id, (err) ->
		if err then res.send(err)
		else res.send(message: 'Successfully deleted Tag')
