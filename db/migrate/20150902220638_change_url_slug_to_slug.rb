class ChangeUrlSlugToSlug < ActiveRecord::Migration
  def self.up
    rename_column :foodscape, :URL_slug, :slug
  end

  def self.down
    rename_column :foodscape, :slug, :URL_slug
  end
end
