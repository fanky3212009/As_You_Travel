class AddUserIdToFavourite < ActiveRecord::Migration
  def change
    add_reference :favourites, :user, index: true
  end
end
