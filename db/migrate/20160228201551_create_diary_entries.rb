class CreateDiaryEntries < ActiveRecord::Migration
  def change
    create_table :diary_entries do |t|
      t.string :title
      t.string :location
      t.datetime :data
      t.text :content
      t.text :recommendation
      t.belongs_to :journey, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
