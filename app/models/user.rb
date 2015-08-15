class User < ActiveRecord::Base
  has_many :foodscapes, foreign_key: 'host_id'

  has_many :subscriptions
  has_many :foodscapes, through: :subscriptions
end
