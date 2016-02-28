class AddOwnerIdToJourney < ActiveRecord::Migration
  def change
    add_column :journeys, :owner_id, :integer, index: true, foreign_key: true
  end
end
