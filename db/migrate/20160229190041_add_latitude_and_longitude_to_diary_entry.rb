class AddLatitudeAndLongitudeToDiaryEntry < ActiveRecord::Migration
  def change
    add_column :diary_entries, :latitude, :float
    add_column :diary_entries, :longitude, :float
  end
end
