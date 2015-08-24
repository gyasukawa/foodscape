class CreateUpdates < ActiveRecord::Migration
  def change
    create_table :updates do |t|
      t.references :foodscape
      t.string :heading
      t.string :description

      t.timestamps null: false
    end
  end
end
