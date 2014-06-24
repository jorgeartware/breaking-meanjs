'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Stdcrud = mongoose.model('Stdcrud'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Stdcrud already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Stdcrud
 */
exports.create = function(req, res) {
	var stdcrud = new Stdcrud(req.body);
	stdcrud.user = req.user;

	stdcrud.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(stdcrud);
		}
	});
};

/**
 * Show the current Stdcrud
 */
exports.read = function(req, res) {
	res.jsonp(req.stdcrud);
};

/**
 * Update a Stdcrud
 */
exports.update = function(req, res) {
	var stdcrud = req.stdcrud ;

	stdcrud = _.extend(stdcrud , req.body);

	stdcrud.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(stdcrud);
		}
	});
};

/**
 * Delete an Stdcrud
 */
exports.delete = function(req, res) {
	var stdcrud = req.stdcrud ;

	stdcrud.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(stdcrud);
		}
	});
};

/**
 * List of Stdcruds
 */
exports.list = function(req, res) { Stdcrud.find().sort('-created').populate('user', 'displayName').exec(function(err, stdcruds) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(stdcruds);
		}
	});
};

/**
 * Stdcrud middleware
 */
exports.stdcrudByID = function(req, res, next, id) { Stdcrud.findById(id).populate('user', 'displayName').exec(function(err, stdcrud) {
		if (err) return next(err);
		if (! stdcrud) return next(new Error('Failed to load Stdcrud ' + id));
		req.stdcrud = stdcrud ;
		next();
	});
};

/**
 * Stdcrud authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.stdcrud.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};