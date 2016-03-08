class AddDefaultValueToJourneyImgAndDesc < ActiveRecord::Migration
  def change
    change_column :journeys, :feat_img, :string, default: ""
    change_column :journeys, :description, :string, default: ""
    change_column :users, :profile_img, :string, default: ""
  end
end
