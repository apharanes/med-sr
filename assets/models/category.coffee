mongoose = require 'mongoose'
Schema = mongoose.Schema

CategorySchema = new Schema(
	name: { type: String, required: true }
	description: { type: String, default: '' },
	color: { type: String }
)

module.exports = mongoose.model 'Category', CategorySchema