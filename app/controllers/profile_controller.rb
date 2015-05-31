class ProfileController < ApplicationController
  before_filter :authenticate_user!

  def index
    authorize! :update, current_user
  end

  def update
    user_params = params[:user]
    user_id = user_params.delete(:id)
    @user = User.find(user_id)
    authorize! :update, @user

    if needs_password?(@user, user_params)
      user_params.delete(:password)
      user_params.delete(:password_confirmation)
      @txn_success = @user.update_without_password(user_params)
    else
      @txn_success = @user.update(user_params)
    end

    render "profile/update.json"
  end

  protected
  def needs_password?(user, params)
    params[:password].present?
  end
end
