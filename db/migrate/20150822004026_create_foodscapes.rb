class CreateFoodscapes < ActiveRecord::Migration
  def change
    create_table :foodscapes do |t|
      t.belongs_to :user
      t.string :name
      t.string :address_line_1
      t.string :address_line_2
      t.string :city
      t.string :state
      t.integer :zip_code
      t.string :produce
      t.string :goalsneeds
      t.string :other_details
      t.string :URL_slug

      t.timestamps null: false
    end
  end
end
