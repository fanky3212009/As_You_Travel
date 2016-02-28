class RenameDataColumnToDateOnDiaryEntries < ActiveRecord::Migration
  def change
    rename_column :diary_entries, :data, :date
  end
end
