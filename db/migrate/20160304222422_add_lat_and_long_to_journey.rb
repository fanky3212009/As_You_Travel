class AddLatAndLongToJourney < ActiveRecord::Migration
  def change
    add_column :journeys, :latitude, :float
    add_column :journeys, :longitude, :float
  end
end
