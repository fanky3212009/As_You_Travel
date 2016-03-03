class CreateFavourites < ActiveRecord::Migration
  def change
    create_table :favourites do |t|
      t.references :favourable, polymorphic: true, index: true

      t.timestamps null: false
    end
  end
end
