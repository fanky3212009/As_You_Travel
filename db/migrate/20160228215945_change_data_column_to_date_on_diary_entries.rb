class ChangeDataColumnToDateOnDiaryEntries < ActiveRecord::Migration
  def change
    change_column :diary_entries, :data, :date
  end
end
