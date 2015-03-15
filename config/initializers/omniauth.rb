OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, "819356764767622", "1ad62cd0f7b45b8fb2ba39c2732646b3"
end
