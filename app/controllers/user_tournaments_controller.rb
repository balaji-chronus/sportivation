class UserTournamentsController < ApplicationController
  before_filter :authenticate_user!

  def create
    @user_tournament = UserTournament.new(user_tournament_permitted_params)
    @user_tournament.user_id = current_user.id
    @user_tournament.save

    render "user_tournaments/create.json"
  end

  def update

  end

  private

  def user_tournament_permitted_params
    params.require(:user_tournament).permit([:id, :name, :team, :summary, :location, :tournament_date])
  end
end
