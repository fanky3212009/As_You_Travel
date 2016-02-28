class ChangeDateColumnToDateTimeOnDiaryEntries < ActiveRecord::Migration
  def change
    change_column :diary_entries, :date, :datetime
  end
end
