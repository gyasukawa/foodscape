class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.references :foodscape
      t.boolean :main

      t.timestamps null: false
    end
  end
end
