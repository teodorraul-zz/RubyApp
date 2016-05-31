class SetupTables < ActiveRecord::Migration
  def change
    create_table :companies do |c|
      c.string :company_identification, unique: true, null: false
      c.string :name, unique: true, null: false
      c.string :address, null: false
      c.string :city, null: false
      c.string :country, null: false
      c.string :email
      c.string :phone_number
      c.timestamps null: false
    end

    create_table :employees do |e|
      e.string :name, unique: true, null: false
      e.string :address, null: false
      e.string :city, null: false
      e.string :country, null: false
      e.string :email
      e.string :phone_number
      e.string :position, null: false
      e.belongs_to :company, index: true
      e.timestamps null: false
    end

    create_table :company_versionings do |cv|
      cv.string :company_identification
      cv.string :name
      cv.string :address
      cv.string :city
      cv.string :country
      cv.string :email
      cv.string :phone_number
      cv.belongs_to :company, index: true
      cv.timestamps null: false
    end

    create_table :employee_versionings do |ev|
      ev.string :name
      ev.string :address
      ev.string :city
      ev.string :country
      ev.string :email
      ev.string :phone_number
      ev.string :position
      ev.belongs_to :employee, index: true
      ev.timestamps null: false
    end
  end
end
