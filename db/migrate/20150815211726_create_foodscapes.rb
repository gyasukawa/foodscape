class CreateFoodscapes < ActiveRecord::Migration
  def change
    create_table :foodscapes do |t|

      t.timestamps null: false
    end
  end
end
