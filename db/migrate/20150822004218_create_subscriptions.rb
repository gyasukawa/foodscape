class CreateSubscriptions < ActiveRecord::Migration
  def change
    create_table :subscriptions, id:false do |t|
      t.belongs_to :user
      t.belongs_to :foodscape

      t.timestamps null: false
    end
  end
end
