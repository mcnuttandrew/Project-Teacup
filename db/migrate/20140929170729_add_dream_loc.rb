class AddDreamLoc < ActiveRecord::Migration
  def change
    add_column :posts, :dream_latitude, :float
    add_column :posts, :dream_longitude, :float
  end
end
