express = require 'express'
Profile = require '../../models/profile'

#
# List profiles
#
exports.index = (req, res) ->
	Profile.find {}, (err, profiles) ->
		if err then res.send(err)
		else res.json(profiles)

#
# Create profile
#
exports.create = (req, res) ->
	profile = new Profile(req.body)    
	profile.save (err) ->        
		if err then res.send(err)
		else res.json message: 'Successfully created profile'

#
# Load profile
#
exports.load = (req, res) ->
	Profile.findById _id: req.params.profile_id, (err, profile) ->
		if err then res.send(err)
		else res.json(profile)

#
# Update profile
#
exports.update = (req, res) ->
	Profile.findOne _id: req.params.profile_id, (err, profile) ->
		if err then res.send(err)
		else
			for prop in req.body
				profile[prop] = req.body[prop]
				
			profile.save (err) ->
				if err then res.send(err)
				else res.json message: 'Profile updated'

#
# Delete profile
#
exports.destroy = (req, res) ->
	Profile.remove _id: req.params.profile_id, (err, profile) ->
		if err then res.send(err)
		else res.json message: 'Successfully deleted profile'
