mongoose = require 'mongoose'
Schema = mongoose.Schema

ProfileSchema = new Schema(
    name: { type: String, required: true}
)

module.exports = mongoose.model 'Profile', ProfileSchema