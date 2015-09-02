class Foodscape < ActiveRecord::Base
  belongs_to :user

  has_many :subscriptions
  has_many :users, through: :subscriptions

  has_many :updates
  has_many :pictures

  validates_uniqueness_of :user_id, message: "Cannot create more than one foodscape!"

  accepts_nested_attributes_for :updates

  attr_accessor :slug, :name
  validates_presence_of :slug

  def to_param
    slug
  end
end
