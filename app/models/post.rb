class Post < ActiveRecord::Base
  validates :content, presence: true
  
  belongs_to :user
  has_many :comments
  default_scope {order :id => :desc}
end
