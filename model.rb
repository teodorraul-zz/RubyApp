class Company < ActiveRecord::Base
  	include ActiveModel::Validations
  	validates :company_identification, length: { minimum: 2, maximum: 40 }, presence: true
  	validates :name, length: { minimum: 2, maximum: 40 }, presence: true
  	validates :address, length: { minimum: 2, maximum: 40 }, presence: true
  	validates :city, length: { minimum: 2, maximum: 40 }, presence: true
  	validates :country, length: { minimum: 2, maximum: 40 }, presence: true
  	validates :email, length: { minimum: 2, maximum: 40 }, :allow_blank => true
  	validates :phone_number, length: { is: 10 }, :allow_blank => true
  	validates :email, email: true, :allow_blank => true
	validates_uniqueness_of :email, :case_sensitive => false, :allow_blank => true
	validates_uniqueness_of :name, :case_sensitive => false
	validates_uniqueness_of :company_identification, :case_sensitive => false
  	has_many :employees, :dependent => :delete_all
  	has_many :company_versionings, :dependent => :delete_all
end

class CompanyIdValidator < ActiveModel::EachValidator
	def validate(record)
	    unless Company.exists?(['id = ?', "#{record.company_id}"])
	    	record.errors[:company_id] << 'Wrong CID'
	    end
  	end
end

class CompanyVersioning < ActiveRecord::Base
	belongs_to :company
end

class Employee < ActiveRecord::Base
  	include ActiveModel::Validations
	belongs_to :company
	validates :name, length: { minimum: 2, maximum: 40 }, presence: true
	validates :address, length: { minimum: 2, maximum: 40 }, presence: true
	validates :city, length: { minimum: 2, maximum: 40 }, presence: true
	validates :country, length: { minimum: 2, maximum: 40 }, presence: true
	validates :phone_number, length: { is: 10 }, :allow_blank => true
	validates :position, length: { minimum: 2, maximum: 40, }, presence: true
	validates :company_id, length: { maximum: 40 }, presence: true, company_id:true
  	validates :email, email: true, :allow_blank => true
  	has_many :employee_versionings, :dependent => :delete_all
end


class EmployeeVersioning < ActiveRecord::Base
	belongs_to :employee
end