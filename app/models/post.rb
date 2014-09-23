class Post < ActiveRecord::Base
  validates :content, presence: false
  
  belongs_to :user
end
