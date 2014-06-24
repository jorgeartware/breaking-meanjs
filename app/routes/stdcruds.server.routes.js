'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var stdcruds = require('../../app/controllers/stdcruds');

	// Stdcruds Routes
	app.route('/stdcruds')
		.get(stdcruds.list)
		.post(users.requiresLogin, stdcruds.create);

	app.route('/stdcruds/:stdcrudId')
		.get(stdcruds.read)
		.put(users.requiresLogin, stdcruds.hasAuthorization, stdcruds.update)
		.delete(users.requiresLogin, stdcruds.hasAuthorization, stdcruds.delete);

	// Finish by binding the Stdcrud middleware
	app.param('stdcrudId', stdcruds.stdcrudByID);
};