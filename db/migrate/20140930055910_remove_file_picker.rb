class RemoveFilePicker < ActiveRecord::Migration
  def change
        remove_column :users, :filepicker_url
  end
end
