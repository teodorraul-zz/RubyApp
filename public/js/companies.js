module.service( 'Companies', [ '$rootScope', function( $rootScope ) {
	var scope = {
		selected_company_id : "",
		companies : [],
		model: {
				id: "",
				company_id: "",
				name: "",
				address: "",
				city: "",
				country: "",
				email: "",
				phone_number: ""
		},
		companyModal : {
			status: "",
			id: "",	
			fields: {
				id: "",
				company_id: "",
				name: "",
				address: "",
				city: "",
				country: "",
				email: "",
				phone_number: ""
			},
			done: function(){
				var tempCompanyModel;
				angular.copy(model,tempCompanyModel);
				var data = JSON.stringify(tempCompanyModel);
				if (scope.companyModal.status == 'edit') {
				    $http.put(apiHost + "/api/companies/" + $scope.companyModal.id, data).success(function(data, status) {
				        $rootScope.reloadModel();
				    });
					$('#companyModal').modal('hide');
				}
				else if (scope.companyModal.status == 'add') {
				    $http.post(apiHost + "/api/companies", data).success(function(data, status) {
				        $rootScope.reloadModel();
				    });
					$('#companyModal').modal('hide');
				}
			}
		},
		addCompanyClicked : function(){
				scope.companyModal.status = "add"
				scope.companyModal.id = ""
		    		angular.copy(scope.companies[i].name, "");
		    		angular.copy(scope.companies[i].company_id, "");
		    		angular.copy(scope.companies[i].address, "");
		    		angular.copy(scope.companies[i].city, "");
		    		angular.copy(scope.companies[i].country, "");
		    		angular.copy(scope.companies[i].email, "");
		    		angular.copy(scope.companies[i].phone_number, "");
				$('#companyModal').modal('show');
		},
		editCompanyClicked : function(id){
			for (var i = scope.companies.length - 1; i >= 0; i--) {
				if(scope.companies[i].id == id){
					scope.companyModal.status = "edit"
					scope.companyModal.id = id
		    		angular.copy(scope.companies[i].company_id, scope.companyModal.fields.company_id);
		    		angular.copy(scope.companies[i].address, scope.companyModal.fields.address);
		    		angular.copy(scope.companies[i].city, scope.companyModal.fields.city);
		    		angular.copy(scope.companies[i].country, scope.companyModal.fields.country);
		    		angular.copy(scope.companies[i].email, scope.companyModal.fields.email);
		    		angular.copy(scope.companies[i].phone_number, scope.companyModal.fields.phone_number);
				}
				$('#companyModal').modal('show');
			}
		},
		deleteCompanyClicked : function(id){
			$http.delete(apiHost + "/api/companies/" + id, "").success(function(data, status) {
				$rootScope.reloadModel();
			});
		}
	}
	return scope;
}]);