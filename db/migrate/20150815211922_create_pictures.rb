class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.references :foodscape
      t.main :boolean
      t.
      t.timestamps null: false
    end
  end
end
