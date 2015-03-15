class FauthController < ApplicationController
  respond_to :json

  def create
    user = User.from_omniauth(env["omniauth.auth"])
    sign_in_and_redirect user, :event => :authentication
  end
end
