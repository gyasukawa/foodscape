class ChangeUrlSlugToSlug < ActiveRecord::Migration
  def self.up
    rename_column :foodscapes, :URL_slug, :slug
  end

  def self.down
    rename_column :foodscapes, :slug, :URL_slug
  end
end
