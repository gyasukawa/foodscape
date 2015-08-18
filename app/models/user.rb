class User < ActiveRecord::Base
  has_one :foodscape

  has_many :subscriptions
  has_many :foodscapes, through: :subscriptions
end
