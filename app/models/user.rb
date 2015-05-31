require Rails.root.to_s+'/app/models/ability'

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  attr_protected :oauth_token, :uid, :provider

  def ability
    @ability = Ability.new(self)
  end

  def reset_ability
    @ability = nil
  end

  def get_ability
    @ability ||= Ability.new(self)
  end

  def can?(permission, object)
    get_ability.can?(permission, object)
  end

  def cannot?(permission, object)
    !get_ability.can?(permission, object)
  end

  def self.from_omniauth(auth)
    where(email: auth.info.email).first_or_create.tap do |user|
     user.provider = auth.provider
     user.uid = auth.uid
     user.name = auth.info.name
     user.oauth_token = auth.credentials.token
     user.oauth_expires_at = Time.at(auth.credentials.expires_at)
     user.save!
    end
  end

  def password_required?
    super && provider.blank?
  end
end
