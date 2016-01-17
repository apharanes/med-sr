mongoose = require 'mongoose'
Schema = mongoose.Schema
ObjectId = Schema.ObjectId

ProgramSchema = new Schema(
	name: { type: String, required: true }
	schedules: [{ type: ObjectId, ref: 'Schedule' }]
)

module.exports = mongoose.model 'Program', ProgramSchema