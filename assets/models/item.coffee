mongoose = require 'mongoose'
Schema = mongoose.Schema
ObjectId = Schema.ObjectId

ItemSchema = new Schema(
    name: { type: String, required: true }
    description: { type: String, default: '' }
    startDate: { type: Date, required: true }
    lastDateReviewed: { type: Date }
    programs: [{ type: ObjectId, ref: 'Program' }]
    color: { type: String }
    tags: [{ type: ObjectId, ref: 'Tag'}]
    categories: [{ type: ObjectId, ref: 'Category'}]
    confidence: { type: Number, minimum: 0, maximum: 100, default: 0 }
    recurrences: [{ type: Date }]
)

module.exports = mongoose.model 'Item', ItemSchema