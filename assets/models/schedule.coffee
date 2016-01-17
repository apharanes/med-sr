mongoose = require 'mongoose'
Schema = mongoose.Schema

ScheduleSchema = new Schema(
	name: { type: String, required: true, default: '' }
	recurrence: { type: Number, required: true, default: 0 }
	period: { type: Number, required: true, default: 0 }
)

module.exports = mongoose.model 'Schedule', ScheduleSchema