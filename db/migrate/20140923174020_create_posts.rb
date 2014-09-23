class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.references :user, index: true, null: false
      t.string :content, null: false
      t.timestamps
    end
  end
end
