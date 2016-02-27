class CreateJourneys < ActiveRecord::Migration
  def change
    create_table :journeys do |t|
      t.string :title
      t.datetime :start_date
      t.datetime :end_date
      t.text :description
      t.string :feat_img
      t.string :location

      t.timestamps null: false
    end
  end
end
