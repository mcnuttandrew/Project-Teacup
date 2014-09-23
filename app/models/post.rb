class Post < ActiveRecord::Base
  validates :content, presence: false
  
  belongs_to :user
  has_many :comments
end
