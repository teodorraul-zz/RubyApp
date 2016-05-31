var apiHost = "http://localhost:4567"
var app = angular.module('ruby-app', [])
app.controller('ruby-controller', function($scope,$http){
	$scope.companies = [];
	$scope.companyVersionings = [];
	$scope.employees = [];
	$scope.employeeVersionings = [];
	$scope.selected_company = {};
	$scope.displayEmployees = "false";
	$scope.reloadModel = function(){
	    $http.get(apiHost + '/api/companies').success(function(data) {
	    	$scope.companies = data;
		});
		$scope.selected_company.id = -1;
		$scope.displayEmployees = "false";
		$scope.reloadEmployees();
	};
	$scope.reloadEmployees = function(){
		$http.get(apiHost + '/api/companies/' + $scope.selected_company.id + '/employees' ).success(function(data) {
	    	$scope.employees = data;
		});
	};
	$scope.deselectRow = function(){
		$('.selected-company').removeClass('selected-company');
	    var scope = angular.element($("select")).scope();
	    $scope.displayEmployees = "false";
	    $scope.employees = "";
        $scope.$apply();
	};
	$scope.reloadModel();
	$scope.selectCompany = function(id, $event){
	    $http.get(apiHost + '/api/companies/' + id + '/employees' ).success(function(data) {
	    	$scope.employees = data;
		});
	    $('.selected-company').removeClass('selected-company');
		angular.element($event.currentTarget).addClass('selected-company');
		$scope.displayEmployees = "true";
		for (var i = $scope.companies.length - 1; i >= 0; i--) {
			if($scope.companies[i].id==id){
				$scope.selected_company = $scope.companies[i];
			}
		}
	};
	$scope.selectEmployee = function(id){
		for (var i = $scope.employees.length - 1; i >= 0; i--) {
			if($scope.employees[i].id==id){
				$scope.selected_employee = $scope.employees[i];
			}
		}
	}
	$scope.employeeModal = {
		status: "",
		id: "",
		company_id: "",
		name: "",
		address: "",
		city: "",
		country: "",
		email: "",
		phone_number: "",	
		position: "",
		done: function(){
			var tempEmployeeModel = {
				"company_id": $scope.selected_company.id,
				"name": $scope.employeeModal.name,
				"address": $scope.employeeModal.address,
				"city": $scope.employeeModal.city,
				"country": $scope.employeeModal.country,
				"email": $scope.employeeModal.email,
				"position": $scope.employeeModal.position,
				"phone_number": $scope.employeeModal.phone_number
			}
			var data = JSON.stringify(tempEmployeeModel);
			if ($scope.employeeModal.status == 'edit') {
				$scope.companyModal.errors = []
			    $http.put(apiHost + "/api/employees/" + $scope.employeeModal.id, data).success(function(data, status) {
					if(data['response'] == "SUCCESS"){
						$scope.reloadEmployees();
						$('#employeeModal').modal('hide');
					}
					else{
					     for (var fieldErrors in data){
					     	for (var i=0; i<data[fieldErrors].length; i++){
					     		errorString = data[fieldErrors][i]
					     		$scope.companyModal.errors.push(errorString);
					     	}
					     }
					}
			    });
			}
			else if ($scope.employeeModal.status == 'add') {
				$scope.companyModal.errors = []
			    $http.post(apiHost + "/api/employees", data).success(function(data, status) {
			    	console.log(data)
					if(data['response'] == "SUCCESS"){
						$scope.reloadEmployees();
						$('#employeeModal').modal('hide');
					}
					else{
					     for (var fieldErrors in data){
					     	for (var i=0; i<data[fieldErrors].length; i++){
					     		errorString = data[fieldErrors][i]
					     		$scope.companyModal.errors.push(errorString);
					     	}
					     }
					}
			    });
			}
		}
	}
	$scope.companyModal = {
		status: "",
		id: "",
		company_identification: "",
		name: "",
		address: "",
		city: "",
		country: "",
		email: "",
		phone_number: "",
		errors: [],	
		done: function(){
			var tempCompanyModel = {
				"company_identification": $scope.companyModal.company_identification,
				"name": $scope.companyModal.name,
				"address": $scope.companyModal.address,
				"city": $scope.companyModal.city,
				"country": $scope.companyModal.country,
				"email": $scope.companyModal.email,
				"phone_number": $scope.companyModal.phone_number
			}
			var data = JSON.stringify(tempCompanyModel);
			if ($scope.companyModal.status == 'edit') {
				$scope.companyModal.errors = []
			    $http.put(apiHost + "/api/companies/" + $scope.companyModal.id, data).success(function(data, status) {
					if(data['response'] == "SUCCESS"){
			        	$scope.reloadModel();
						$('#companyModal').modal('hide');
					}
					else{
					     for (var fieldErrors in data){
					     	for (var i=0; i<data[fieldErrors].length; i++){
					     		errorString = data[fieldErrors][i]
					     		$scope.companyModal.errors.push(errorString);
					     	}
					     }
					}
			    });
			}
			else if ($scope.companyModal.status == 'add') {
				$scope.companyModal.errors = []
			    $http.post(apiHost + "/api/companies", data).success(function(data, status) {
					if(data['response'] == "SUCCESS"){
			        	$scope.reloadModel();
						$('#companyModal').modal('hide');
					}
					else{
					     for (var fieldErrors in data){
					     	for (var i=0; i<data[fieldErrors].length; i++){
					     		errorString = data[fieldErrors][i]
					     		$scope.companyModal.errors.push(errorString);
					     	}
					     }
					}
			    });
			}
		}
	}
	$scope.editCompanyClicked = function(id){
		for (var i = $scope.companies.length - 1; i >= 0; i--) {
			if($scope.companies[i].id == id){
				$scope.companyModal.status = "edit"
				$scope.companyModal.id = id
				$scope.companyModal.company_identification = $scope.companies[i].company_identification;
				$scope.companyModal.name = $scope.companies[i].name;
				$scope.companyModal.address = $scope.companies[i].address;
				$scope.companyModal.city = $scope.companies[i].city;
				$scope.companyModal.country = $scope.companies[i].country;
				$scope.companyModal.email = $scope.companies[i].email;
				$scope.companyModal.phone_number = $scope.companies[i].phone_number;
				$scope.companyModal.errors = []
			}
			$('#companyModal').modal('show');
		}
	}
	$scope.editEmployeeClicked = function(id){
		for (var i = $scope.employees.length - 1; i >= 0; i--) {
			if($scope.employees[i].id == id){
				$scope.employeeModal.status = "edit"
				$scope.employeeModal.id = id
				$scope.employeeModal.name = $scope.employees[i].name;
				$scope.employeeModal.address = $scope.employees[i].address;
				$scope.employeeModal.city = $scope.employees[i].city;
				$scope.employeeModal.country = $scope.employees[i].country;
				$scope.employeeModal.email = $scope.employees[i].email;
				$scope.employeeModal.phone_number = $scope.employees[i].phone_number;
				$scope.employeeModal.position = $scope.employees[i].position;
				$scope.companyModal.errors = []
			}
			$('#employeeModal').modal('show');
		}
	}
	$scope.addCompanyClicked = function(){
			$scope.companyModal.status = "add"
			$scope.companyModal.id = ""
			$scope.companyModal.company_identification = "";
			$scope.companyModal.name = "";
			$scope.companyModal.address = "";
			$scope.companyModal.city = "";
			$scope.companyModal.country = "";
			$scope.companyModal.email = "";
			$scope.companyModal.phone_number = "";
			$scope.companyModal.errors = []
			$('#companyModal').modal('show');
	}
	$scope.showCompanyVersionings = function(id){
	    $http.get(apiHost + '/api/companies/' + id + '/versioning' ).success(function(data) {
	    	$scope.companyVersionings = data;
		});
		$('#companyVersioningModal').modal('show');
	}
	$scope.showEmployeeVersionings = function(id){
	    $http.get(apiHost + '/api/employees/' + id + '/versioning' ).success(function(data) {
	    	$scope.employeeVersionings = data;
		});
		$('#employeeVersioningModal').modal('show');
	}
	$scope.addEmployeeClicked = function(){
			$scope.employeeModal.status = "add"
			$scope.employeeModal.id = ""
			$scope.employeeModal.company_id = "";
			$scope.employeeModal.name = "";
			$scope.employeeModal.address = "";
			$scope.employeeModal.city = "";
			$scope.employeeModal.country = "";
			$scope.employeeModal.email = "";
			$scope.employeeModal.phone_number = "";
			$scope.employeeModal.position = ""
			$scope.employeeModal.errors = []
			$('#employeeModal').modal('show');
	}
	$scope.deleteCompanyClicked = function(id){
		$http.delete(apiHost + "/api/companies/" + id, "").success(function(data, status) {
			$scope.reloadModel();
		});
	};
	$scope.deleteEmployeeClicked = function(id){
		$http.delete(apiHost + "/api/employees/" + id, "").success(function(data, status) {
			$scope.reloadEmployees();
		});
	};
	$('html').click(function() {
		$('.selected-company').removeClass('selected-company');
		$scope.deselectRow();
	});
	$('.panel, .modal, .panel-parent').click(function(event){
	    event.stopPropagation();
	});
});

