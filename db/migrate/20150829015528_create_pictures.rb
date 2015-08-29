class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.references :foodscape
      t.boolean :main
      t.attachment :image

      t.timestamps null: false
    end
  end
end
