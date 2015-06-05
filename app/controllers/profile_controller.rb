class ProfileController < ApplicationController
  before_filter :authenticate_user!

  def index
    authorize! :update, current_user
  end

  def update
    user_params = user_permitted_params
    user_id = user_params.delete(:id)
    user_tournaments_attributes = user_params.delete("user_tournaments")
    @user = User.find(user_id)
    authorize! :update, @user
    @user.user_tournaments = UserTournament.setup_user_tournaments(user_tournaments_attributes)

    if needs_password?(@user, user_params)
      user_params.delete(:password)
      user_params.delete(:password_confirmation)
      @txn_success = @user.update_without_password(user_params)
    else
      @txn_success = @user.update(user_params)
    end

    render "profile/update.json"
  end

  def show
    @user = User.includes(:user_tournaments).where(id: params[:id]).first
    authorize! :show, @user

    render "profile/show.json"
  end

  protected
  def needs_password?(user, params)
    params[:password].present?
  end

  def user_permitted_params
    params.require(:user).permit([:id, :email, :created_at, :updated_at, :name,
                  :displayname, :contactphone, :address, :summary, :dob, :gender,
                  {:user_tournaments => [:id, :name, :team, :summary, :location, :tournament_date]}])
  end
end
