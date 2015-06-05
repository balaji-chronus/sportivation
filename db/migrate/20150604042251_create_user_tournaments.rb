class CreateUserTournaments < ActiveRecord::Migration
  def change
    create_table :user_tournaments do |t|
      t.string :name
      t.text :summary
      t.string :team
      t.string :location
      t.date :tournament_date
      t.belongs_to :user

      t.timestamps null: false
    end
  end
end
