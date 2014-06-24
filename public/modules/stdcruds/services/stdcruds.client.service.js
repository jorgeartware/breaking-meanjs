'use strict';

//Stdcruds service used to communicate Stdcruds REST endpoints
angular.module('stdcruds').factory('Stdcruds', ['$resource',
	function($resource) {
		return $resource('stdcruds/:stdcrudId', { stdcrudId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);