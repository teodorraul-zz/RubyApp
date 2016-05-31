var controller = [ '$scope', '$http', 'Companies', 'Employees', function( $scope, $http, Companies, Employees ) {
	var apiHost = "http://localhost:4567"
	$scope.displayEmployees = "false";
	$scope.companies = Companies.companies;
	$scope.companyModal = {
		company_id: Companies.companyModal.company_id,
		name: Companies.companyModal.name,
		address:Companies.companyModal.address,
		city: Companies.companyModal.city,
		country: Companies.companyModal.country,
		email: Companies.companyModal.email,
		phone_number: Companies.companyModal.phone_number
	}

	$scope.addCompanyClicked = function(){
		Companies.addCompanyClicked();
	}

	$scope.editCompanyClicked = function(id){
		Companies.editCompanyClicked(id);
	}

	$scope.deleteCompanyClicked = function(id){
		Companies.deleteCompanyClicked(id);
	}

	$scope.reloadModel = function(){
			$http.get(apiHost + '/api/companies').success(function(data) {
			for (var i = data.length - 1; i >= 0; i--) {
				var tempCompany = Companies.model;
				tempCompany.id = data[i].id;
				tempCompany.company_id = data[i].company_id;
				tempCompany.name = data[i].name;
				tempCompany.address = data[i].address;
				tempCompany.city = data[i].city;
				tempCompany.country = data[i].country;
				tempCompany.phone_number = data[i].phone_number;
				Companies.companies.push(tempCompany);
			}
		});
	};
	$scope.reloadModel();

	// Layout

	$scope.deselectRow = function(){
		$('.selected-company').removeClass('selected-company');
	    var scope = angular.element($("select")).scope();
	    $scope.displayEmployees = "false";
	    $scope.employees = "";
        $scope.$apply();
	};

	$scope.selectCompany = function(id, $event){
	    $http.get(apiHost + '/api/companies/' + id + '/employees' ).success(function(data) {
	    	$scope.employees = data;
		});
	    $('.selected-company').removeClass('selected-company');
		angular.element($event.currentTarget).addClass('selected-company');
		$scope.displayEmployees = "true";
		Companies.selected_company_id = id;
	};

	$('html').click(function() {
		$('.selected-company').removeClass('selected-company');
		$scope.deselectRow();
	});

	$('.panel, .modal, .col-md-6').click(function(event){
	    event.stopPropagation();
	});
}];
 
module.controller( "ruby-controller", controller );