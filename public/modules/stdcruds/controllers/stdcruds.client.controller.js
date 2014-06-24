'use strict';

// Stdcruds controller
angular.module('stdcruds').controller('StdcrudsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Stdcruds',
	function($scope, $stateParams, $location, Authentication, Stdcruds ) {
		$scope.authentication = Authentication;

		// Create new Stdcrud
		$scope.create = function() {
			// Create new Stdcrud object
			var stdcrud = new Stdcruds ({
				name: this.name
			});

			// Redirect after save
			stdcrud.$save(function(response) {
				$location.path('stdcruds/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Stdcrud
		$scope.remove = function( stdcrud ) {
			if ( stdcrud ) { stdcrud.$remove();

				for (var i in $scope.stdcruds ) {
					if ($scope.stdcruds [i] === stdcrud ) {
						$scope.stdcruds.splice(i, 1);
					}
				}
			} else {
				$scope.stdcrud.$remove(function() {
					$location.path('stdcruds');
				});
			}
		};

		// Update existing Stdcrud
		$scope.update = function() {
			var stdcrud = $scope.stdcrud ;

			stdcrud.$update(function() {
				$location.path('stdcruds/' + stdcrud._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Stdcruds
		$scope.find = function() {
			$scope.stdcruds = Stdcruds.query();
		};

		// Find existing Stdcrud
		$scope.findOne = function() {
			$scope.stdcrud = Stdcruds.get({ 
				stdcrudId: $stateParams.stdcrudId
			});
		};
	}
]);