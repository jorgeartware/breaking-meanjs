'use strict';

//Setting up route
angular.module('stdcruds').config(['$stateProvider',
	function($stateProvider) {
		// Stdcruds state routing
		$stateProvider.
		state('listStdcruds', {
			url: '/stdcruds',
			templateUrl: 'modules/stdcruds/views/list-stdcruds.client.view.html'
		}).
		state('createStdcrud', {
			url: '/stdcruds/create',
			templateUrl: 'modules/stdcruds/views/create-stdcrud.client.view.html'
		}).
		state('viewStdcrud', {
			url: '/stdcruds/:stdcrudId',
			templateUrl: 'modules/stdcruds/views/view-stdcrud.client.view.html'
		}).
		state('editStdcrud', {
			url: '/stdcruds/:stdcrudId/edit',
			templateUrl: 'modules/stdcruds/views/edit-stdcrud.client.view.html'
		});
	}
]);