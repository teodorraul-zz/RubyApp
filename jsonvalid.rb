def validate_and_save_company(data)
	company = Company.new{
		|c|
		c.company_identification = data['company_identification'];
		c.name = data['name'];
		c.address = data['address'];
		c.city = data['city'];	
		c.country = data['country'];
		c.email = data['email'];
		c.phone_number = data['phone_number'];
	}

	company.save()
	if company.errors.messages.length > 0
	  	j = ActiveSupport::JSON
	  	j.encode(company.errors.as_json(full_messages: true))
	else
		"{\"response\":\"SUCCESS\"}"
	end
end

def validate_and_update_company(company,data)
	companyLastVersion = CompanyVersioning.new{
		|cv|
		cv.company_identification = company.company_identification;
		cv.name = company.name;
		cv.address = company.address;
		cv.city = company.city;	
		cv.country = company.country;
		cv.email = company.email;
		cv.phone_number = company.phone_number;
		cv.company_id = company.id;
	}

	company = Company.update(company.id,{
		:company_identification => data['company_identification'],
		:name => data['name'],
		:address => data['address'],
		:city => data['city'],
		:country => data['country'],
		:email => data['email'],
		:phone_number => data['phone_number']})

	if company.errors.messages.length > 0
	  	j = ActiveSupport::JSON
	  	j.encode(company.errors.as_json(full_messages: true))
	else
		companyLastVersion.save()
		"{\"response\":\"SUCCESS\"}"
	end
end

def validate_and_save_employee(data)
	employee = Employee.new{
		|e|
		e.name = data['name'];
		e.address = data['address'];
		e.city = data['city'];	
		e.country = data['country'];
		e.email = data['email'];
		e.phone_number = data['phone_number'];
		e.position = data['position'];
		e.company_id = data['company_id'];
	}
	employee.save()
	if employee.errors.messages.length > 0
	  	j = ActiveSupport::JSON
	  	j.encode(employee.errors.as_json(full_messages: true))
	else
		"{\"response\":\"SUCCESS\"}"
	end
end

def validate_and_update_employee(employee,data)
	employeeLastVersion = EmployeeVersioning.new{
		|ev|
		ev.name = employee.name;
		ev.address = employee.address;
		ev.city = employee.city;	
		ev.country = employee.country;
		ev.email = employee.email;
		ev.phone_number = employee.phone_number;
		ev.employee_id = employee.id;
	}
	employee = Employee.update(employee.id,{
		:name => data['name'],
		:address => data['address'],
		:city => data['city'],
		:country => data['country'],
		:email => data['email'],
		:phone_number => data['phone_number'],
		:position => data['position'],
		:company_id => data['company_id']})

	if employee.errors.messages.length > 0
	  	j = ActiveSupport::JSON
	  	j.encode(employee.errors.as_json(full_messages: true))
	else
		employeeLastVersion.save();
		"{\"response\":\"SUCCESS\"}"
	end
end