class Subscription < ActiveRecord::Base

  belongs_to :user
  belongs_to :foodscape

end
