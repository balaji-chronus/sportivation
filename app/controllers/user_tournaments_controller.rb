class UserTournamentsController < ApplicationController
  before_filter :authenticate_user!

  def create
    @user_tournament = UserTournament.new(user_tournament_permitted_params)
    authorize! :create, @user_tournament

    @user_tournament.user_id = current_user.id
    @user_tournament.save

    render "user_tournaments/create_update.json"
  end

  def update
    user_tournament_id = user_tournament_permitted_params.delete(:id)
    @user_tournament = UserTournament.find(user_tournament_id)
    authorize! :update, @user_tournament

    @txn_success = @user_tournament.update(user_tournament_permitted_params)

    render "user_tournaments/create_update.json"
  end

  private

  def user_tournament_permitted_params
    params.require(:user_tournament).permit([:id, :name, :team, :summary, :location, :tournament_date])
  end
end
