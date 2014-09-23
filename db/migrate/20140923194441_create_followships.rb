class CreateFollowships < ActiveRecord::Migration
  def change
    create_table :followships do |t|
      t.integer :followee_id, null:false
      t.integer :follower_id, null:false
      t.timestamps
    end
    add_index :followships, :followee_id
    add_index :followships, :follower_id
    add_index :followships, [:followee_id, :follower_id], unique: true
  end
end
