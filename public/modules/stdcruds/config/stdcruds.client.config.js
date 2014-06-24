'use strict';

// Configuring the Articles module
angular.module('stdcruds').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Stdcruds', 'stdcruds', 'dropdown', '/stdcruds(/create)?');
		Menus.addSubMenuItem('topbar', 'stdcruds', 'List Stdcruds', 'stdcruds');
		Menus.addSubMenuItem('topbar', 'stdcruds', 'New Stdcrud', 'stdcruds/create');
	}
]);