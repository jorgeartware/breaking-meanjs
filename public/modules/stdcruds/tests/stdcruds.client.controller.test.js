'use strict';

(function() {
	// Stdcruds Controller Spec
	describe('Stdcruds Controller Tests', function() {
		// Initialize global variables
		var StdcrudsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Stdcruds controller.
			StdcrudsController = $controller('StdcrudsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Stdcrud object fetched from XHR', inject(function(Stdcruds) {
			// Create sample Stdcrud using the Stdcruds service
			var sampleStdcrud = new Stdcruds({
				name: 'New Stdcrud'
			});

			// Create a sample Stdcruds array that includes the new Stdcrud
			var sampleStdcruds = [sampleStdcrud];

			// Set GET response
			$httpBackend.expectGET('stdcruds').respond(sampleStdcruds);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.stdcruds).toEqualData(sampleStdcruds);
		}));

		it('$scope.findOne() should create an array with one Stdcrud object fetched from XHR using a stdcrudId URL parameter', inject(function(Stdcruds) {
			// Define a sample Stdcrud object
			var sampleStdcrud = new Stdcruds({
				name: 'New Stdcrud'
			});

			// Set the URL parameter
			$stateParams.stdcrudId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/stdcruds\/([0-9a-fA-F]{24})$/).respond(sampleStdcrud);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.stdcrud).toEqualData(sampleStdcrud);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Stdcruds) {
			// Create a sample Stdcrud object
			var sampleStdcrudPostData = new Stdcruds({
				name: 'New Stdcrud'
			});

			// Create a sample Stdcrud response
			var sampleStdcrudResponse = new Stdcruds({
				_id: '525cf20451979dea2c000001',
				name: 'New Stdcrud'
			});

			// Fixture mock form input values
			scope.name = 'New Stdcrud';

			// Set POST response
			$httpBackend.expectPOST('stdcruds', sampleStdcrudPostData).respond(sampleStdcrudResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Stdcrud was created
			expect($location.path()).toBe('/stdcruds/' + sampleStdcrudResponse._id);
		}));

		it('$scope.update() should update a valid Stdcrud', inject(function(Stdcruds) {
			// Define a sample Stdcrud put data
			var sampleStdcrudPutData = new Stdcruds({
				_id: '525cf20451979dea2c000001',
				name: 'New Stdcrud'
			});

			// Mock Stdcrud in scope
			scope.stdcrud = sampleStdcrudPutData;

			// Set PUT response
			$httpBackend.expectPUT(/stdcruds\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/stdcruds/' + sampleStdcrudPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid stdcrudId and remove the Stdcrud from the scope', inject(function(Stdcruds) {
			// Create new Stdcrud object
			var sampleStdcrud = new Stdcruds({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Stdcruds array and include the Stdcrud
			scope.stdcruds = [sampleStdcrud];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/stdcruds\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleStdcrud);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.stdcruds.length).toBe(0);
		}));
	});
}());