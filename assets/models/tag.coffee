mongoose = require 'mongoose'
Schema = mongoose.Schema

TagSchema = new Schema(
	name: { type: String, required: true }
	description: { type: String, required: true }
	color: { type: String, required: true }
)

module.exports = mongoose.model 'Tag', TagSchema
