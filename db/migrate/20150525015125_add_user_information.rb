class AddUserInformation < ActiveRecord::Migration
  def change
    add_column :users, :displayname, :string, :length => 16
    add_column :users, :contactphone, :string, :length => 16
    add_column :users, :address, :string, :length => 2048
    add_column :users, :summary, :string, :length => 2048
    add_column :users, :dob, :date
    add_column :users, :gender, :string, :length => 12
  end
end
