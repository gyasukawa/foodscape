class Subscription < ActiveRecord::Base
  validates_uniqueness_of :user_id, :scope => :foodscape_id

  belongs_to :user
  belongs_to :foodscape

end
