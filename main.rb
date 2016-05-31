require 'sinatra'
require 'sinatra/activerecord'
require 'json'
require 'missing_validators'
require './environment'
require './model'
require './jsonvalid'

get '/' do
  redirect to('/index.html')
end

############### READ

get '/api/companies' do
  	companies = Company.all
  	j = ActiveSupport::JSON
  	j.encode(companies)
end

get '/api/companies/:id' do
  	company = Company.find(params[:id])
  	j = ActiveSupport::JSON
  	j.encode(company)
end


get '/api/companies/*/versioning' do
  	versionings = CompanyVersioning.where(["company_id = ?", params['splat'][0]])
  	j = ActiveSupport::JSON
  	j.encode(versionings)
end

get '/api/companies/*/employees' do
  	employees = Employee.where(["company_id = ?", params['splat'][0]])
  	j = ActiveSupport::JSON
  	j.encode(employees)
end

get '/api/employees' do
  	employees = Employee.all
  	j = ActiveSupport::JSON
  	j.encode(employees)
end

get '/api/employees/:id' do
  	employee = Employee.find(params[:id])
  	j = ActiveSupport::JSON
  	j.encode(employee)
end


get '/api/employees/*/versioning' do
  	versionings = EmployeeVersioning.where(["employee_id = ?", params['splat'][0]])
  	j = ActiveSupport::JSON
  	j.encode(versionings)
end

############### CREATE

post '/api/companies' do
	data = JSON.parse(request.body.read)
	validate_and_save_company(data)
end

post '/api/employees' do
	data = JSON.parse(request.body.read)
	validate_and_save_employee(data)
end

############### UPDATE

put '/api/companies/:id' do
	data = JSON.parse(request.body.read)
	puts data
	if company = Company.find(params[:id])
		validate_and_update_company(company,data)
	end
end

put '/api/employees/:id' do
	data = JSON.parse(request.body.read)
	if employee = Employee.find(params[:id])
		validate_and_update_employee(employee, data)
	end
end

############### DETELE

delete '/api/companies/:id' do
	Company.destroy(params[:id])
end

delete '/api/employees/:id' do
	Employee.destroy(params[:id])
end