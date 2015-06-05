class UserTournament < ActiveRecord::Base
  belongs_to :user
  attr_accessible :name, :team, :summary, :location, :tournament_date

  before_save :change_tournament_date

  def change_tournament_date
    if self.tournament_date_changed?
      self.tournament_date = self.tournament_date + 1.day
    end
  end

  def self.setup_user_tournaments(user_tournaments_attributes)
    return user_tournaments_attributes.collect do |tournament|
      new_tournament = UserTournament.find_or_initialize_by(:id => tournament.delete(:id))
      new_tournament[:name] = tournament[:name]
      new_tournament[:team] = tournament[:team]
      new_tournament[:summary] = tournament[:summary]
      new_tournament[:location] = tournament[:location]
      new_tournament[:tournament_date] = tournament[:tournament_date]
      new_tournament
    end
  end
end
