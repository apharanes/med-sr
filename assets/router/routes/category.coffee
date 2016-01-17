#
# Categories are a way to group items that is not related to time.
#
# @namespace Routes
# @exports Category
#
express = require 'express'
Category = require '../../models/category'

#
# List all Categories
#
exports.index = (req, res) ->
	Category.find {}, (err, categories) ->
		if err then res.send(err)
		else res.json(categories)

#
# Create Category
# @param {Object} req.body - metadata of Category
#
exports.create = (req, res) ->
	category = new Category(req.body)

	return category.save (err) ->
		if (err) then res.send(err)
		else res.send(category)

#
# Load a Category
# @param {string} req.params.category_id
#
exports.load = (req, res) ->
	Category.findById req.params.category_id, (err, category) ->
		if err then res.send(err)
		else res.json(category)

#
# Update Category
# @param {string} req.params.category_id
#
exports.update = (req, res) ->
	return Category.findOne _id: req.params.category_id, (err, category) ->
		if err then res.send(err)
		else
			for prop in req.body
				category[prop] = req.body[prop]

			return category.save (err) ->
				if err then res.send(err)
				else res.json(message: 'Category updated')

#
# Delete Category
# @param {string} req.params.category_id
#
exports.destroy = (req, res) ->
	return Category.remove _id: req.params.category_id, (err, category) ->
		if err then res.send(err)
		else res.json 'Successfully deleted category ' + category._id
