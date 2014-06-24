'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Stdcrud Schema
 */
var StdcrudSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Stdcrud name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Stdcrud', StdcrudSchema);